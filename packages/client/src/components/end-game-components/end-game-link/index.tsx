import React, { memo, FC } from 'react'
import { EndGameLinkType } from './types'
import { Box } from '@mui/material'
import styles from './styles.module.css'

export const EndGameLink: FC<EndGameLinkType> = memo(({ children }) => {
  return <Box className={styles.layout}>{children}</Box>
})
