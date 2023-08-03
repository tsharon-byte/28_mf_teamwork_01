import React, { FC } from 'react'
import { Button, Avatar, CircularProgress } from '@mui/material'
import { Login } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import { makeResourcePath } from '../../helpers'
import { useUser } from '../../hooks'

const Auth: FC = () => {
  const { loading, user } = useUser()

  return loading ? (
    <CircularProgress />
  ) : user ? (
    <Avatar
      alt={user.first_name}
      src={user.avatar && makeResourcePath(user.avatar)}
    />
  ) : (
    <Button
      component={NavLink}
      to="/login"
      variant="outlined"
      color="inherit"
      startIcon={<Login />}>
      Войти
    </Button>
  )
}

export default Auth
