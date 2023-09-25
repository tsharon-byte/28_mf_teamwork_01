import React, { FC, memo } from 'react'
import { Box, Card, Typography } from '@mui/material'
import { TopicItemType } from './types'
import styles from './styles.module.css'
import { format } from 'date-fns'

export const TopicItem: FC<TopicItemType> = memo(({ chat, handleNavigate }) => {
  const callback = () => handleNavigate(chat.id)
  return (
    <Card className={styles.item}>
      <Box className={styles.info}>
        <Typography variant="body1">
          {format(Date.parse(chat.created_at), 'dd-MM-YYY HH:mm')}
        </Typography>
      </Box>
      <Box className={styles.message}>
        <Typography className={styles.title} variant="h5" onClick={callback}>
          {chat.name}
        </Typography>
        <Typography variant="body1">{chat?.description}</Typography>
      </Box>
    </Card>
  )
})
