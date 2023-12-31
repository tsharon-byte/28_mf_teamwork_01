import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import Registration from '../pages/registration'
import Profile from '../pages/profile'
import Game from '../pages/game'
import Leaderboard from '../pages/leaderboard'
import Forum from '../pages/forum'
import ForumTopic from '../pages/forum-topic'
import EndGame from '../pages/end-game'
import { ROUTE_PATH } from './constants'
import ErrorPage from '../pages/error-page'
import ProtectedRoute from '../components/protected-route'
import Page500 from '../pages/page-500'

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.HOME,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTE_PATH.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTE_PATH.REGISTRATION,
    element: <Registration />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: ROUTE_PATH.PROFILE,
        element: <Profile />,
      },
      {
        path: ROUTE_PATH.GAME,
        element: <Game />,
      },
      {
        path: ROUTE_PATH.LEADERBOARD,
        element: <Leaderboard />,
      },
      {
        path: ROUTE_PATH.FORUM,
        element: <Forum />,
      },
      {
        path: ROUTE_PATH.FORUM + '/:topicId',
        element: <ForumTopic />,
      },
      {
        path: ROUTE_PATH.ENDGAME,
        element: <EndGame />,
      },
    ],
  },
  {
    path: ROUTE_PATH.SERVER_ERROR,
    element: <Page500 />,
  },
])

export default router
