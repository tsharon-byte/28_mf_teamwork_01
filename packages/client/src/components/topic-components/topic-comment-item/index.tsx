import React, {
  ChangeEvent,
  FormEvent,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Avatar, Box, Button, Paper, Typography } from '@mui/material'
import { TopicCommentItemType } from './types'
import styles from './styles.module.css'
import { getCountDaysAgo } from '../../../utils/get-count-days-ago'
import { makeResourcePath } from '../../../helpers'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { userSelector } from '../../../store/slices/user-slice/selectors'
import getUserThunk from '../../../store/slices/user-slice/thunks/get-user-thunk'
import CommentsReplyModal from '../../forum-components/comments-reply-modal'
import { createCommentsThunk } from '../../../store/slices/comments-slice/thunks'
import getCommentsByIdThunk from '../../../store/slices/comments-slice/thunks/get-comments-by-id-thunk'
import classNames from 'classnames'

export const TopicCommentItem = memo(
  forwardRef<HTMLDivElement, TopicCommentItemType>(
    ({ text, author, date, id, topicId, replyComments, isReply }, ref) => {
      const [isOpenModal, setIsOpenModal] = useState(false)
      const [message, setMessage] = useState('')

      const dispatch = useAppDispatch()
      const { foundUser } = useAppSelector(userSelector)

      useEffect(() => {
        if (!foundUser) {
          dispatch(getUserThunk(author))
        }
      }, [author])

      const handleOpenModal = useCallback(() => setIsOpenModal(() => true), [])
      const handleCloseModal = useCallback(
        () => setIsOpenModal(() => false),
        []
      )

      const handleChangeMessage = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.currentTarget
          setMessage(value)
        },
        [message]
      )

      const handleCancel = useCallback(() => {
        setIsOpenModal(false)
        setMessage('')
      }, [setIsOpenModal, setMessage])

      const handleSendReply = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()

          if (message.trim() !== '') {
            dispatch(
              createCommentsThunk({
                id: Number(topicId),
                parentId: Number(id),
                text: message,
              })
            )
              .unwrap()
              .then(() => {
                setMessage('')
                dispatch(getCommentsByIdThunk())
                setIsOpenModal(() => false)
              })
          }
        },
        [message]
      )

      return (
        <>
          <Paper
            className={classNames(styles.comment, isReply && styles.reply)}
            ref={ref}>
            <Avatar
              src={
                (foundUser?.avatar && makeResourcePath(foundUser.avatar)) || ''
              }
              className={styles.avatar}
            />
            <Box className={styles.box}>
              <Box>
                <Typography variant="body1" color="secondary">
                  {foundUser?.display_name}
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
              {!isReply && (
                <Button
                  variant="text"
                  className={styles.button}
                  onClick={handleOpenModal}>
                  Ответить
                </Button>
              )}
            </Box>
          </Paper>
          {replyComments &&
            replyComments.map(comment => (
              <TopicCommentItem
                key={comment.id}
                id={comment.id}
                text={comment.text}
                author={comment.authorId}
                date={comment.createdAt}
                topicId={topicId}
                isReply={true}
              />
            ))}
          <CommentsReplyModal
            isOpenModal={isOpenModal}
            handleCloseModal={handleCloseModal}
            handleChangeMessage={handleChangeMessage}
            handleSendReply={handleSendReply}
            handleCancel={handleCancel}
          />
        </>
      )
    }
  )
)
