import React, { forwardRef, memo } from 'react'
import { Paper, Typography } from '@mui/material'
import { TopicCommentItemType } from './types'
import styles from './styles.module.css'

export const TopicCommentItem = memo(
  forwardRef<HTMLDivElement, TopicCommentItemType>(
    ({ text, author, date }, ref) => {
      return (
        <Paper className={styles.comment} ref={ref}>
          <Typography variant="body1" color="secondary">
            {author}
          </Typography>
          <Typography variant="body1" className={styles.text}>
            {text}
          </Typography>
          <Typography variant="body1" color="secondary" className={styles.date}>
            {date}
          </Typography>
        </Paper>
      )
    }
  )
)
