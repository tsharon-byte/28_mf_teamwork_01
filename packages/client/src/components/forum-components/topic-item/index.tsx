import React, { memo, FC } from 'react'
import { Card, Typography, Box, Avatar } from '@mui/material'
import { TopicItemType } from './types'
import styles from './styles.module.css'
import { getCountDaysAgo } from '../../../utils/get-count-days-ago'

export const TopicItem: FC<TopicItemType> = memo(({ chat, handleNavigate }) => {
  const callback = () => handleNavigate(chat.id)
  return (
    <Card className={styles.item}>
      {/*{chat.last_message && (*/}
      {/*  <Box className={styles.info}>*/}
      {/*    <Typography variant='body1'>{chat.last_message.time}</Typography>*/}
      {/*  </Box>*/}
      {/*)}*/}
      <Box className={styles.message}>
        <Typography className={styles.title} variant="h5" onClick={callback}>
          {chat.title}
        </Typography>
        {chat.last_message && (
          <>
            <Typography variant="body1">{chat.last_message.content}</Typography>
            <Box>
              <Avatar
                src={
                  chat.last_message?.user.avatar
                    ? chat.last_message.user.avatar
                    : ''
                }
              />
              <Typography variant="body1">
                {chat.last_message.user.login}
              </Typography>
              <Typography variant="body1">
                {getCountDaysAgo(chat.last_message.time)}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Card>
  )
})
