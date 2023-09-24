import { Outlet, Navigate } from 'react-router-dom'
import React, { FC } from 'react'
import { useUser } from '../../hooks'
import { ROUTE_PATH } from '../../utils/constants'
import { CircularProgress } from '@mui/material'
import styles from './styles.module.css'

const ProtectedRoute: FC = () => {
  const { user, error, loading } = useUser()

  if (error) {
    return <Navigate to={ROUTE_PATH.LOGIN} replace />
  }

  if (loading) {
    return (
      <section className={styles.section}>
        <CircularProgress />
      </section>
    )
  }

  return user && <Outlet />
}

export default ProtectedRoute
