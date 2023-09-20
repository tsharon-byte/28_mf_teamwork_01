import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { App } from 'client/src/components'
import { store } from './store'

export function render(url: string) {
  const appHTML = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </StrictMode>
  )
  const preloadedState = store.getState()

  return { appHTML, preloadedState }
}
