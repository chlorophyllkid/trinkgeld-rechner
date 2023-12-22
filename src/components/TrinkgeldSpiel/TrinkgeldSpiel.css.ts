import { css } from 'lit'

const trinkgeldSpielStyles = css`
  /* resets  */
  p,
  h2 {
    margin: 0;
  }

  /* overrides */
  input,
  button {
    font-family: inherit;
    font-size: inherit;
  }

  /* styles */
  form {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  input {
    flex: 1 1 auto;
    min-width: 0;
    text-align: right;
  }

  input,
  button {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  h2 {
    font-size: xxx-large;
  }

  :host > * + * {
    margin-top: 1em;
  }
`

export default trinkgeldSpielStyles
