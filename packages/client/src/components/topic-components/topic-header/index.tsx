import React, { memo } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { TopicHeaderType } from './types'
import styles from './styles.module.css'
import { CircularProgress, Typography } from '@mui/material'

export const TopicHeader = memo(
  ({ callback, loading, title }: TopicHeaderType) => {
    return (
      <header className={styles.header}>
        <ArrowBackIcon onClick={callback} className={styles.arrow} />
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography variant="h1">{title}</Typography>
        )}
      </header>
    )
  }
)
