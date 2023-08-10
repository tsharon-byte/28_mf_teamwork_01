import React, { FC } from 'react'
import { Button, Avatar, AvatarProps } from '@mui/material'
import { Login } from '@mui/icons-material'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { makeResourcePath } from '../../helpers'
import { ROUTE_PATH } from '../../utils/constants'
import withUser from '../../hocs/with-user'

const WithUserAvatar = withUser<
  AvatarProps & { component: typeof NavLink } & NavLinkProps
>()(Avatar)

const Auth: FC = () => (
  <WithUserAvatar
    alt={user => user.first_name}
    src={user => user.avatar && makeResourcePath(user.avatar)}
    component={NavLink}
    to={ROUTE_PATH.PROFILE}
    errorComponent={
      <Button
        component={NavLink}
        to={ROUTE_PATH.LOGIN}
        variant="outlined"
        color="inherit"
        startIcon={<Login />}>
        Войти
      </Button>
    }
  />
)

export default Auth
