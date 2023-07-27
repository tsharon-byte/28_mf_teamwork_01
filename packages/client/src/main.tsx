import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { theme } from './theme'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
)
