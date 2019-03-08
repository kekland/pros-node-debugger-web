import { Component, Prop } from '@stencil/core';
import { IMessageData } from '../../classes/MessageData';


@Component({
  tag: 'messages-component',
  styleUrl: 'messages-component.css',
  shadow: true
})
export class MessagesComponent {
  @Prop() data: IMessageData[]

  render() {
    return (
      <div class='container'>
        {
          this.data.map((msg) => {
            return <div>
              <span class='time'>{msg.time}</span> <br />
              <span class={msg.type === 'error'? 'errorMessage': 'normalMessage'}>{msg.data}</span>
              <hr />
            </div>
          })
        }
      </div>
    );
  }
}
