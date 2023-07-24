import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/app'
import '@fontsource/khand/400.css'
import '@fontsource/notable/400.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
