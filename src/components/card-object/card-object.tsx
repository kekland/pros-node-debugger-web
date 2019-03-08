import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'card-object',
  styleUrl: 'card-object.css',
  shadow: true
})
export class CardObject {
  @Prop() title: string;
  render() {
    return (
      <div class='container'>
        <div class='card-object' >
          <span class='title'>{this.title}</span>
          <slot />
        </div>
      </div>
    );
  }
}
