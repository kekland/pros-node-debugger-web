import { Component, State } from '@stencil/core';
import * as socketio from 'socket.io-client'
import { IMotorDebuggerData } from '../../classes/MotorData';
import { IMessageData } from '../../classes/MessageData';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  @State() motors: IMotorDebuggerData[] = [];
  @State() messages: IMessageData[] = [];
  @State() id: number = 0
  socket: SocketIOClient.Socket;
  render() {
    return (
      <div id='app-root' class='bg-dark'>
        <div id='messages' class='app-panel'>
          <span class='app-panel-title'>Messages
            <button id='flash-button' onClick={() => this.flash()}><span>Flash</span></button>
          </span>
          <messages-component data={this.messages}></messages-component>
        </div>
        <div id='devices' class='app-panel'>
          <span class='app-panel-title'>Devices</span>
          {
            this.motors.map((motor) => {
              return <motor-component key={motor.id} data={motor}></motor-component>
            })
          }
        </div>
      </div>
    );
  }
  componentDidLoad() {
    this.socket = socketio.connect('http://localhost:8078', {})
    this.socket.on('data', (data) => this.onSocketData(data))
  }

  onSocketData(data: any) {
    if (data.type === 'motor') {
      let exists = false
      this.motors.forEach((motor) => exists = (motor.id === data.id) ? true : exists)
      if (exists) {
        this.motors = this.motors.map((motor) => {
          if (motor.id === data.id) {
            return data
          }
          return motor
        })
      }
      else {
        this.motors = [
          ...this.motors,
          data
        ]
      }
    }
    else {
      data.time = new Date(Date.now()).toTimeString()
      this.messages = [
        data,
        ...this.messages,
      ]
    }
    this.id = this.id + 1
  }

  flash() {
    console.log('flash')
    this.socket.emit('flash')
  }
}
