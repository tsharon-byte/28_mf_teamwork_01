import React, { FC } from 'react'
import { Button, Avatar, CircularProgress } from '@mui/material'
import { Login } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import { makeResourcePath } from '../../helpers'
import { useUser } from '../../hooks'
import { ROUTE_PATH } from '../../utils/constants'

const Auth: FC = () => {
  const { loading, user } = useUser()

  if (loading) {
    return <CircularProgress />
  }

  return user ? (
    <Avatar
      alt={user.first_name}
      src={user.avatar && makeResourcePath(user.avatar)}
      component={NavLink}
      to={ROUTE_PATH.PROFILE}
    />
  ) : (
    <Button
      component={NavLink}
      to={ROUTE_PATH.LOGIN}
      variant="outlined"
      color="inherit"
      startIcon={<Login />}>
      Войти
    </Button>
  )
}

export default Auth
