import React, { FC } from 'react'
import { Box, Button } from '@mui/material'
import { Login } from '@mui/icons-material'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
import IPageLayoutProps from './types'
import { Navigation } from '../../components'

const PageLayout: FC<IPageLayoutProps> = ({ children, navigation = true }) => (
  <>
    <Box component="header" className={styles.header}>
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
    <Box component="main" className={styles.main}>
      {children}
    </Box>
    <Box component="footer" className={styles.footer}></Box>
  </>
)

export default PageLayout
