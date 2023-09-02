import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { configureStore } from '@reduxjs/toolkit'
import { forumSlice, userSlice } from './src/store/slices'
import { App } from './src/components'

export function render(url: string) {
  const store = configureStore({
    reducer: {
      user: userSlice.reducer,
      forum: forumSlice.reducer,
    },
  })

  const preloadedState = store.getState()
  const appHTML = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </StrictMode>
  )

  return { appHTML, preloadedState }
}
