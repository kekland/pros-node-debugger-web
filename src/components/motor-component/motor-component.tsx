import { Component, Prop } from '@stencil/core';
import { IMotorDebuggerData, BrakeMode, EncoderUnits } from '../../classes/MotorData';


@Component({
  tag: 'motor-component',
  styleUrl: 'motor-component.css',
  shadow: true
})
export class MotorComponent {
  @Prop() data: IMotorDebuggerData;
  render() {
    return (
      <div class='motor-container'>
        <card-object title='Motor: motor1'>
          <div id='data'>
            <data-item title='Brake mode'>
              <value-unit-display value={this.brakeMode} unit='' />
            </data-item>
            <data-item title='Current draw'>
              <value-unit-display value={this.currentDraw} unit='Amps' />
            </data-item>
            <data-item title='Efficiency'>
              <value-unit-display value={this.efficiency} unit='%' />
            </data-item>
            <data-item title='Gearing'>
              <value-unit-display value={this.gearing} unit='rpm' />
            </data-item>
            <data-item title='Power'>
              <value-unit-display value={this.power} unit='Watts' />
            </data-item>
            <data-item title='Torque'>
              <value-unit-display value={this.torque} unit='Nm' />
            </data-item>
            <data-item title='Voltage'>
              <value-unit-display value={this.voltage} unit='Volt' />
            </data-item>
            <data-item title='Position'>
              <div class='data-item-with-target'>
                <div class='data-item-value-container'>
                  <span class='data-item-description'>Current</span>
                  <value-unit-display value={this.position} unit={this.positionUnits} class='data-item-value' />
                </div>
                <div class='data-item-arrow'>&rarr;</div>
                <div class='data-item-value-container'>
                  <span class='data-item-description'>Target</span>
                  <value-unit-display value={this.targetPosition} unit={this.positionUnits} class='data-item-value' />
                </div>
              </div>
            </data-item>
            <data-item title='Velocity'>
              <div class='data-item-with-target'>
                <div class='data-item-value-container'>
                  <span class='data-item-description'>Current</span>
                  <value-unit-display value={this.velocity} unit='rpm' class='data-item-value' />
                </div>
                <div class='data-item-arrow'>&rarr;</div>
                <div class='data-item-value-container'>
                  <span class='data-item-description'>Target</span>
                  <value-unit-display value={this.targetVelocity} unit='rpm' class='data-item-value' />
                </div>
              </div>
            </data-item>
          </div>
        </card-object>
      </div>
    );
  }

  get currentDraw() {
    return this.data.params.currentDraw / 1000.0;
  }
  
  get power() {
    return this.data.params.power
  }

  get brakeMode() {
    return BrakeMode[this.data.params.brakeMode]
  }

  get efficiency() {
    return this.data.params.efficiency
  }

  get gearing() {
    return this.data.params.gearing
  }

  get torque() {
    return this.data.params.torque
  }

  get voltage() {
    return this.data.params.voltage / 1000.0;
  }

  get position() {
    return this.data.params.position
  }

  get targetPosition() {
    return this.data.params.targetPosition
  }

  get velocity() {
    return this.data.params.actualVelocity
  }

  get targetVelocity() {
    return this.data.params.targetVelocity
  }

  get positionUnits() {
    return EncoderUnits[this.data.params.encoderUnits]
  }
}
