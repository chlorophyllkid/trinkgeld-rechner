import { LitElement, html } from 'lit'
import { customElement, state, query, property } from 'lit/decorators.js'

import trinkgeldSpielStyles from './TrinkgeldSpiel.css.ts'

const newRandomBetrag = () => Math.floor(Math.random() * (10000 - 500)) / 100

@customElement('trinkgeld-spiel')
class TrinkgeldSpiel extends LitElement {
  static styles = trinkgeldSpielStyles

  @property({
    attribute: false,
    hasChanged(newVal: number, oldVal: number) {
      return newVal !== oldVal
    },
    state: true,
    type: Number,
  })
  private _randomBetrag: number = 0

  @state()
  private _submitEnabled = false
  private _percentageDifference: number | undefined

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
    const betragString = formData.get('betrag') as string
    const betrag = parseFloat(betragString.replace('.', '').replace(',', '.'))

    this._percentageDifference = ((betrag - this._randomBetrag) / this._randomBetrag) * 100
    this._input.value = ''
    this._submitEnabled = false
  }

  private _init() {
    this._randomBetrag = newRandomBetrag()
    this._percentageDifference = undefined
  }

  protected firstUpdated() {
    this._init()
  }

  protected render() {
    return html`
      <p>
        Die Rechnung kommt, und du musst
        ${this._randomBetrag.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} bezahlen.
      </p>
      <p>Wie viel Trinkgeld gibst du?</p>

      <form @submit=${this._onSubmit}>
        <label for="betrag">Betrag</label>
        <input
          @input=${this._inputChanged}
          id="betrag"
          name="betrag"
          type="text"
          placeholder="bspw. 23,45"
          pattern="[0-9]+([,][0-9]+)?"
          oninvalid="this.setCustomValidity('Es können nur Zahlen im deutschem Zahlenformat eingegeben werden.')"
          oninput="this.setCustomValidity('')"
        />
        <button type="submit" ?disabled=${!this._submitEnabled}>Bezahlen</button>
      </form>

      ${this._percentageDifference !== undefined
        ? html`
            ${0 <= this._percentageDifference && this._percentageDifference < 5
              ? html`
                  <h2>😢</h2>
                  <p>Du hast ${this._percentageDifference.toFixed(2)} % Trinkgeld gegeben.</p>
                  <p>Entweder war es echt nicht gut, oder du bist ganz schön knauserig!</p>
                `
              : ''}
            ${5 <= this._percentageDifference && this._percentageDifference < 10
              ? html`
                  <h2>🙂</h2>
                  <p>Du hast ${this._percentageDifference.toFixed(2)} % Trinkgeld gegeben.</p>
                  <p>Ist ok, aber das geht besser!</p>
                `
              : ''}
            ${10 <= this._percentageDifference && this._percentageDifference < 15
              ? html`
                  <h2>😊</h2>
                  <p>Du hast ${this._percentageDifference.toFixed(2)} % Trinkgeld gegeben.</p>
                  <p>Sweetspot! Alles richtig gemacht!</p>
                `
              : ''}
            ${15 <= this._percentageDifference
              ? html`
                  <h2>😍</h2>
                  <p>Du hast ${this._percentageDifference.toFixed(2)} % Trinkgeld gegeben.</p>
                  <p>Das hat sich doch gelohnt! Die Servicekraft wird freuen!</p>
                `
              : ''}
          `
        : ''}

      <button @click=${this._init}>Neuer Betrag</button>
    `
  }
}

export default TrinkgeldSpiel
