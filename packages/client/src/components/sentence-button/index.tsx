import React, { FC, memo } from 'react'
import { Typography, Link } from '@mui/material'
import { SentenceButtonType } from './types'
import styles from './styles.module.css'

export const SentenceButton: FC<SentenceButtonType> = memo(
  ({ callback, sentence, buttonText }) => {
    return (
      <div className={styles.wrapper}>
        <Typography variant="body1">{sentence}</Typography>
        <Link
          component="button"
          onClick={callback}
          variant="inherit"
          underline="always">
          {buttonText}
        </Link>
      </div>
    )
  }
)
