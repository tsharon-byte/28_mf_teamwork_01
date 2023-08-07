import React, { FC } from 'react'
import { EndGameTitleType } from './types'
import { Typography } from '@mui/material'
import styles from './styles.module.css'

export const EndGameTitle: FC<EndGameTitleType> = ({ text }) => {
  return (
    <Typography variant="h1" className={styles.title}>
      {text}
    </Typography>
  )
}
