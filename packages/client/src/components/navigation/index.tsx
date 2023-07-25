import React, { FC, Children, cloneElement } from 'react'
import { AppBar, List, ListItem } from '@mui/material'
import { NavLinkProps } from 'react-router-dom'
import INavigationProps from './types'
import styles from './styles.module.css'
import classNames from 'classnames'

const Navigation: FC<INavigationProps> = ({ children }) => (
  <AppBar component="nav" color="transparent" className={styles.appBar}>
    <List className={styles.list}>
      {Children.map(children, item => (
        <ListItem className={styles.listItem}>
          {item.props.component
            ? item
            : cloneElement<NavLinkProps>(item, {
                className: ({ isActive }) =>
                  classNames(styles.link, isActive && styles.link_active),
              })}
        </ListItem>
      ))}
    </List>
  </AppBar>
)

export default Navigation
