import React, { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import router from '../../utils/router'
import { darkTheme } from '../../themes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const App: FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
      <ToastContainer />
    </ThemeProvider>
  )
}

export default App
