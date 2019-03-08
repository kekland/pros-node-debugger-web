import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'value-unit-display',
  styleUrl: 'value-unit-display.css',
  shadow: true
})
export class ValueUnitDisplay {
  @Prop() value: any;
  @Prop() unit: string;
  render() {
    return (
      <div>
        <span class='value'>{this.val}</span>
        <span class='unit'>{this.unit}</span>
      </div>
    );
  }

  get val() {
    if(typeof this.value == 'number') {
      return this.value.toFixed(6);
    }
    return this.value
  }
}
