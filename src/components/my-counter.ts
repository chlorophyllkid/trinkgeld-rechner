import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('my-counter')
export class MyCounter extends LitElement {
  @property({ type: Number })
  private _counter = 0

  private _increment() {
    this._counter++
  }

  private _decrement() {
    this._counter--
  }

  protected render() {
    return html`
      <h1>Lit Element - Counter</h1>
      <h2>You clicked ${this._counter} times</h2>
      <button type="button" @click=${this._decrement}>-</button>
      <button type="button" @click=${this._increment}>+</button>
    `
  }
}
