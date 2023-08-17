import React, { memo } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { TopicHeaderType } from './types'
import styles from './styles.module.css'
import { CircularProgress } from '@mui/material'
import { Title } from '../../index'

export const TopicHeader = memo(
  ({ callback, loading, title }: TopicHeaderType) => {
    return (
      <header className={styles.header}>
        <ArrowBackIcon onClick={callback} className={styles.arrow} />
        {loading ? <CircularProgress /> : <Title>{title}</Title>}
      </header>
    )
  }
)
