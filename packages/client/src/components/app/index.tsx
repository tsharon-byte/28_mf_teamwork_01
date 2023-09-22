import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { theme as appTheme } from '../../themes/theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { ROUTE_PATH } from '../../utils/constants'
import Home from '../../pages/home'
import ErrorPage from '../../pages/error-page'
import Login from '../../pages/login'
import Registration from '../../pages/registration'
import ProtectedRoute from '../protected-route'
import Profile from '../../pages/profile'
import Game from '../../pages/game'
import Leaderboard from '../../pages/leaderboard'
import Forum from '../../pages/forum'
import ForumTopic from '../../pages/forum-topic'
import EndGame from '../../pages/end-game'
import Page500 from '../../pages/page-500'
import { useTheme } from '../../hooks'
const App: FC = () => {
  const { theme } = useTheme()

  return (
    <ThemeProvider theme={appTheme(theme)}>
      <CssBaseline />
      <Routes>
        <Route errorElement={<ErrorPage />}>
          <Route path={ROUTE_PATH.HOME} element={<Home />} />
          <Route path={ROUTE_PATH.LOGIN} element={<Login />} />
          <Route path={ROUTE_PATH.REGISTRATION} element={<Registration />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTE_PATH.PROFILE} element={<Profile />} />
            <Route path={ROUTE_PATH.GAME} element={<Game />} />
            <Route path={ROUTE_PATH.LEADERBOARD} element={<Leaderboard />} />
            <Route path={ROUTE_PATH.FORUM} element={<Forum />} />
            <Route
              path={ROUTE_PATH.FORUM + '/:topicId'}
              element={<ForumTopic />}
            />
            <Route path={ROUTE_PATH.ENDGAME} element={<EndGame />} />
          </Route>
          <Route path={ROUTE_PATH.SERVER_ERROR} element={<Page500 />} />
        </Route>
      </Routes>
      <ToastContainer />
    </ThemeProvider>
  )
}

export default App
