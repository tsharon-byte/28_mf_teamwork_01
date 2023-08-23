import ReactDOMServer from 'react-dom/server'

export function render() {
  return ReactDOMServer.renderToString(
    <>
      <h1>SSR</h1>
    </>
  )
}
