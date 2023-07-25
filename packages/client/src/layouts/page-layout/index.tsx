import React, { FC } from 'react'
import classNames from 'classnames'
import { Box, Button } from '@mui/material'
import { Login } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
import IPageLayoutProps from './types'
import { Navigation } from '../../components'

const PageLayout: FC<IPageLayoutProps> = ({
  children,
  navigation = true,
  pageClassName,
  headerClassName,
  mainClassName,
  footerClassName,
}) => (
  <Box className={classNames(styles.page, pageClassName)}>
    <Box
      component="header"
      className={classNames(styles.header, headerClassName)}>
      {navigation && (
        <Navigation>
          <NavLink end to="/">
            Главная
          </NavLink>
          <NavLink to="/leaderboard">Доска лидеров</NavLink>
          <NavLink to="/forum">Форум</NavLink>
          <Button
            component={NavLink}
            to="/login"
            variant="outlined"
            color="inherit"
            startIcon={<Login />}>
            Войти
          </Button>
        </Navigation>
      )}
    </Box>
    <Box component="main" className={classNames(styles.main, mainClassName)}>
      {children}
    </Box>
    <Box
      component="footer"
      className={classNames(styles.footer, footerClassName)}></Box>
  </Box>
)

export default PageLayout
