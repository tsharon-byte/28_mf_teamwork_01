import React, { FC, Children } from 'react'
import { AppBar, List, ListItem } from '@mui/material'
import INavigationProps from './types'

const Navigation: FC<INavigationProps> = ({ children }) => (
  <AppBar component="nav" color="transparent">
    <List>
      {Children.map(children, item => (
        <ListItem>{item}</ListItem>
      ))}
    </List>
  </AppBar>
)

export default Navigation
