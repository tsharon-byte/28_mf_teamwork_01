import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home'
import Page404 from '../pages/page-404'
import Login from '../pages/login'
import Registration from '../pages/registration'
import Profile from '../pages/profile'
import Game from '../pages/game'
import Leaderboard from '../pages/leaderboard'
import Forum from '../pages/forum'
import ForumPost from '../pages/forum-post'
import EndGame from '../pages/end-game'
import { ROUTE_PATH } from './constants'

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.HOME,
    element: <Home />,
    errorElement: <Page404 />,
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
    path: ROUTE_PATH.FORUM + '/:postId',
    element: <ForumPost />,
  },
  {
    path: ROUTE_PATH.ENDGAME,
    element: <EndGame />,
  },
])

export default router
