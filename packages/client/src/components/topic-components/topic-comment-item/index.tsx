import React, { forwardRef, memo } from 'react'
import { Avatar, Box, Button, Paper, Typography } from '@mui/material'
import { TopicCommentItemType } from './types'
import styles from './styles.module.css'
import { getCountDaysAgo } from '../../../utils/get-count-days-ago'
import { makeResourcePath } from '../../../helpers'

export const TopicCommentItem = memo(
  forwardRef<HTMLDivElement, TopicCommentItemType>(
    ({ text, author, date, avatar }, ref) => {
      return (
        <Paper className={styles.comment} ref={ref}>
          <Avatar
            src={(avatar && makeResourcePath(avatar)) || ''}
            className={styles.avatar}
          />
          <Box className={styles.box}>
            <Box>
              <Typography variant="body1" color="secondary">
                {author}
              </Typography>
              <Typography
                variant="body1"
                color="silver"
                className={styles.date}>
                {getCountDaysAgo(date)}
              </Typography>
            </Box>
            <Typography variant="body1" className={styles.text}>
              {text}
            </Typography>
            <Button variant="text" className={styles.button}>
              Ответить
            </Button>
          </Box>
        </Paper>
      )
    }
  )
)
