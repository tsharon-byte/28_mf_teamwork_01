import './app.css'
import router from './utils/router'
import { RouterProvider } from 'react-router-dom'
import React, { FC } from 'react'

const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App
