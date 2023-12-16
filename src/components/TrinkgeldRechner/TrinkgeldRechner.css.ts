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
