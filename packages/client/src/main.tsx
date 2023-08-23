import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { theme } from './theme'
import App from './components/app'
import './index.css'
import { startServiceWorker } from './utils/service-worker/startServiceWorker'
import * as process from 'process'
import store from './store'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </ThemeProvider>
)

if (process.env.NODE_ENV === 'production') {
  startServiceWorker()
}
