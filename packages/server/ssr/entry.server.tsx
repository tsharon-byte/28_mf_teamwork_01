import ReactDOMServer from 'react-dom/server'
import { theme } from 'client/src/theme'
import React from 'react'
import { Provider } from 'react-redux'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import App from 'client/src/components/app'
import { StaticRouter } from 'react-router-dom/server'
import { configureStore } from '@reduxjs/toolkit'
import { forumSlice, userSlice } from 'client/src/store/slices'

export function render(url: string) {
  const store = configureStore({
    reducer: {
      user: userSlice.reducer,
      forum: forumSlice.reducer,
    },
  })
  const preloadedState = store.getState()
  const appHTML = ReactDOMServer.renderToString(
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <Provider store={store}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </Provider>
      </React.StrictMode>
    </ThemeProvider>
  )

  return { appHTML, preloadedState }
}
