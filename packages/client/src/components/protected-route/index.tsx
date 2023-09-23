import { Outlet, Navigate } from 'react-router-dom'
import React, { FC } from 'react'
import { useUser } from '../../hooks'
import { ROUTE_PATH } from '../../utils/constants'

const ProtectedRoute: FC = () => {
  const { user, error } = useUser()

  if (error) {
    return <Navigate to={ROUTE_PATH.LOGIN} replace />
  }

  return user && <Outlet />
}

export default ProtectedRoute
