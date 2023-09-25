import React, { FC } from 'react'
import classNames from 'classnames'
import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.css'
import IPageLayoutProps from './types'
import { Navigation, Auth } from '../../components'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

const PageLayout: FC<IPageLayoutProps> = ({
  children,
  navigation = true,
  pageClassName,
  headerClassName,
  mainClassName,
  footerClassName,
  theme,
  toggleTheme,
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
          <IconButton onClick={toggleTheme} color="inherit">
            {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Auth />
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
