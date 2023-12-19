import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('view-switch')
class ViewSwitch extends LitElement {
  static styles = css`
    button {
      font-family: inherit;
      font-size: inherit;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    div + button {
      margin-top: 3rem;
    }
  `

  @property({ type: String })
  public view1label = 'View 1'

  @property({ type: String })
  public view2label = 'View 2'

  @state()
  private _show = 'view1'

  private _toggleView() {
    this._show = this._show === 'view1' ? 'view2' : 'view1'
  }

  protected render() {
    return html`
      <div>
        <slot name="view1" ?hidden=${this._show === 'view2'}></slot>
        <slot name="view2" ?hidden=${this._show === 'view1'}></slot>
      </div>

      <button @click=${this._toggleView}>
        <span ?hidden=${this._show === 'view2'}>${this.view2label}</span>
        <span ?hidden=${this._show === 'view1'}>${this.view1label}</span>
      </button>
    `
  }
}

export default ViewSwitch
