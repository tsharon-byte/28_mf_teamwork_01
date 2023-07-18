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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Page404 />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registration',
    element: <Registration />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/game',
    element: <Game />,
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />,
  },
  {
    path: '/forum',
    element: <Forum />,
  },
  {
    path: '/forum/:postId',
    element: <ForumPost />,
  },
  {
    path: '/end-game',
    element: <EndGame />,
  },
])

export default router
