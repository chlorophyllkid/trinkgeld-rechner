import { LitElement, html, css } from 'lit'
import { customElement, state, query } from 'lit/decorators.js'

import trinkgeldRechnerStyles from './TrinkgeldRechner.css.ts'

@customElement('trinkgeld-rechner')
class TrinkgeldRechner extends LitElement {
  static styles = trinkgeldRechnerStyles

  @state()
  private _submitEnabled = false
  private _values = new Array<string>()
  private _percentages = [0, 5, 10, 15, 20]
  private _emojis = ['😢', '😕', '🙂', '😊', '😍']

  @query('input')
  private _input!: HTMLInputElement

  private _inputChanged(event: Event) {
    const input = event.target as HTMLInputElement
    this._submitEnabled = !!input.value
  }

  private _onSubmit(event: Event) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const betrag = parseFloat(formData.get('betrag') as string)

    const values = new Array<string>()

    this._percentages.forEach((percentage) => {
      const trinkgeld = betrag * (percentage / 100)
      const total = betrag + trinkgeld

      values.push(total.toFixed(2))
    })

    this._values = values

    this._input.value = ''
    this._submitEnabled = false
  }

  protected render() {
    return html`
      <form @submit=${this._onSubmit}>
        <label for="betrag">Betrag</label>
        <input @input=${this._inputChanged} type="number" id="betrag" name="betrag" min="0" step="0.01" />
        <button type="submit" ?disabled=${!this._submitEnabled}>Berechnen</button>
      </form>

      ${this._values.length
        ? html`
            <h2>Ergebnis</h2>

            <p>Mit ${this._percentages[2]}% Trinkgeld, solltest du mind. ${this._values[2]} € bezahlen.</p>

            <details>
              <summary>Weitere Optionen</summary>
              <table>
                <thead>
                  <tr>
                    <th>%-Trinkgeld</th>
                    <th></th>
                    <th>Gesamt</th>
                  </tr>
                </thead>
                <tbody>
                  ${this._values.map(
                    (value, index) => html`
                      <tr>
                        <td>${this._percentages[index]} %</td>
                        <td>${this._emojis[index]}</td>
                        <td>${value} €</td>
                      </tr>
                    `
                  )}
                </tbody>
              </table>
            </details>
          `
        : ''}
    `
  }
}

export default TrinkgeldRechner
