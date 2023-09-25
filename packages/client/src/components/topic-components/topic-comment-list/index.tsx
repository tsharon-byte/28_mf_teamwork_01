import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react'
import { TopicCommentListType } from './types'
import styles from './styles.module.css'
import { ContentLayout } from '../../../layouts'
import { TopicCommentItem } from '../topic-comment-item'
import { Avatar, Box, Typography } from '@mui/material'
import { makeResourcePath } from '../../../helpers'
import { IUser } from '../../../store/slices/user-slice/types'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { userSelector } from '../../../store/slices/user-slice/selectors'
import { getUserThunk } from '../../../store/slices/user-slice/thunks'

export const TopicCommentList: FC<TopicCommentListType> = memo(
  ({ comments, header, footer, title, description, authorId }) => {
    const endCommentRef = useRef<HTMLDivElement>(null)
    const [user, setUser] = useState<IUser | null>(null)
    const dispatch = useAppDispatch()
    const { foundUsers } = useAppSelector(userSelector)

    const foundUser = useMemo(
      () => foundUsers.find(user => user.id === authorId),
      [authorId]
    )

    useEffect(() => {
      if (endCommentRef.current) {
        endCommentRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }, [comments])

    useEffect(() => {
      if (!foundUser) {
        dispatch(getUserThunk(authorId))
      } else {
        setUser(foundUser)
      }
    }, [foundUser])

    return (
      <ContentLayout
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
              {description || ''}
            </Typography>
          </Box>
        </Box>
        {comments.rows.length > 0 && (
          <Box className={styles.list}>
            <Typography variant="h5" className={styles.subtitle}>
              Комментарии:
            </Typography>
            {comments.rows.map((comment, index) => {
              const { id, text, createdAt, authorId, topicId, parentId } =
                comment
              const replyComments = comments.rows.filter(
                item => item.parentId === id
              )

              if (parentId === null) {
                return (
                  <TopicCommentItem
                    ref={
                      index === comments.rows.length - 1 ? endCommentRef : null
                    }
                    key={id}
                    id={id}
                    text={text}
                    author={authorId}
                    date={createdAt}
                    topicId={topicId}
                    replyComments={replyComments}
                    isReply={false}
                  />
                )
              }
            })}
          </Box>
        )}
      </ContentLayout>
    )
  }
)
