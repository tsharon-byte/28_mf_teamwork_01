import { Outlet, Navigate } from 'react-router-dom'
import { FC } from 'react'
import { useUser } from '../../hooks'
import { ROUTE_PATH } from '../../utils/constants'

const ProtectedRoute: FC = () => {
  const { user } = useUser()

  return user ? <Outlet /> : <Navigate to={ROUTE_PATH.LOGIN} replace />
}

export default ProtectedRoute
