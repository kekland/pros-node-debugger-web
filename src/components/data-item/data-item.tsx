import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'data-item',
  styleUrl: 'data-item.css',
  shadow: true
})
export class DataItem {
  @Prop() title: string;
  render() {
    return (
      <div class='container'>
        <div class='data-item'>
          <div class='data-item-title'>{this.title}</div>
          <div class='data-item-slot'>
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
