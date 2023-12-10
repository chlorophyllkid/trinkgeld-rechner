import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('trinkgeld-rechner')
export class TrinkgeldRechner extends LitElement {
  @property({ type: Array })
  private _percentages = [5, 10, 15, 20, 25, 30]

  @state()
  private _values = new Array<any>()

  private _newround(value: number) {
    return Math.round(value * 2) / 2
  }

  private _onSubmit(event: Event) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const betrag = formData.get('betrag') as string
    const betragNumber = parseFloat(betrag)

    const values = new Array<any>()

    this._percentages.forEach((percentage) => {
      const trinkgeld = betragNumber * (percentage / 100)

      const total = this._newround(betragNumber + trinkgeld)

      const newPercentage = (total / betragNumber) * 100 - 100

      console.log(
        `Bezahlst du ${total.toFixed(2)}€, sind davon ${(total - betragNumber).toFixed(2)}€ Trinkgeld.`,
        `Also ca. ${newPercentage.toFixed(2)}%.`
      )

      values.push({
        percentage,
        trinkgeld: (total - betragNumber).toFixed(2),
        total: total.toFixed(2),
        newPercentage: newPercentage.toFixed(2),
      })
    })

    this._values = values
  }

  protected render() {
    return html`
      <h1>Trinkgeld-Rechner</h1>

      <form @submit=${this._onSubmit}>
        <label for="betrag">Betrag</label>
        <input type="number" id="betrag" name="betrag" value="0" min="0" step="0.01" />
        <button type="submit">Berechnen</button>
      </form>

      ${this._values.length
        ? html`
            <table>
              <thead>
                <tr>
                  <th>Gesamt</th>
                  <th>Trinkgeld (%)</th>
                </tr>
              </thead>
              <tbody>
                ${this._values.map(
                  (value) => html`
                    <tr>
                      <td>${value.total}€</td>
                      <td>${value.newPercentage}%</td>
                    </tr>
                  `
                )}
              </tbody>
            </table>
          `
        : ''}
    `
  }
}
