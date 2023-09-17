import React, { memo, FC, useRef, useEffect } from 'react'
import { TopicCommentListType } from './types'
import styles from './styles.module.css'
import { ContentLayout } from '../../../layouts'
import { TopicCommentItem } from '../topic-comment-item'
import { Avatar, Box, Typography } from '@mui/material'
import { makeResourcePath } from '../../../helpers'

export const TopicCommentList: FC<TopicCommentListType> = memo(
  ({ comments, header, footer, user, title, mode, toggleTheme }) => {
    const endCommentRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
      if (endCommentRef.current) {
        endCommentRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, [comments])
    return (
      <ContentLayout
        mode={mode}
        toggleTheme={toggleTheme}
        mainClassName={styles.main}
        headerClassName={styles.header}
        footerClassName={styles.footer}
        header={header}
        footer={footer}>
        <Box className={styles.title}>
          <Box className={styles.box}>
            <Avatar
              className={styles.avatar}
              src={(user?.avatar && makeResourcePath(user.avatar)) || ''}
            />
            <Typography className={styles.author} variant="h5">
              {user?.login}
            </Typography>
          </Box>
          <Box className={styles.box}>
            <Typography variant="h2">{title}</Typography>
            <Typography className={styles.text} variant="body1">
              {comments[0]?.text}
            </Typography>
          </Box>
        </Box>
        {comments.length > 0 && (
          <Box className={styles.list}>
            <Typography variant="h5" className={styles.subtitle}>
              Комментарии:
            </Typography>
            {comments.map((comment, index) => {
              const { id, text, author, date, avatar } = comment
              return (
                <TopicCommentItem
                  ref={index === comments.length - 1 ? endCommentRef : null}
                  key={id}
                  text={text}
                  author={author}
                  date={date}
                  avatar={avatar}
                />
              )
            })}
          </Box>
        )}
      </ContentLayout>
    )
  }
)
