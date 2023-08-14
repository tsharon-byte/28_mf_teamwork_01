import React, { FC, memo } from 'react'
import { Button, Typography } from '@mui/material'
import { SentenceButtonType } from './types'
import styles from './styles.module.css'

export const SentenceButton: FC<SentenceButtonType> = memo(
  ({ callback, sentence, buttonText }) => {
    return (
      <div className={styles.wrapper}>
        <Typography variant="body1" className={styles.sentence}>
          {sentence}
        </Typography>
        <Button onClick={callback} variant="text" className={styles.button}>
          {buttonText}
        </Button>
      </div>
    )
  }
)