import { css } from 'lit'

const trinkgeldRechnerStyles = css`
  /* resets  */
  p,
  h2 {
    margin: 0;
  }

  /* overrides */
  input,
  button {
    font-family: inherit;
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

  table {
    margin: 0 auto;
    border-collapse: collapse;
  }
  th:not(:nth-of-type(2)),
  td:not(:nth-of-type(2)) {
    text-align: right;
    min-width: 11ch;
  }
  th:last-of-type,
  td:last-of-type {
    flex: 1;
  }
  tr {
    display: flex;
    gap: 0.5rem;
  }

  :host > * + *,
  details > * + * {
    margin-top: 1em;
  }
`

export default trinkgeldRechnerStyles
