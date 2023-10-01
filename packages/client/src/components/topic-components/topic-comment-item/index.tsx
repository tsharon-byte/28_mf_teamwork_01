import React, {
  ChangeEvent,
  FormEvent,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Avatar, Box, Button, Chip, Paper, Typography } from '@mui/material'
import { EmojiesForComment, EmojiesType, TopicCommentItemType } from './types'
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
import TopicCommentMenu from '../TopicCommentMenu/TopicCommentMenu'
import { IUser } from '../../../store/slices/user-slice/types'
import { resetCommentError } from '../../../store/slices/comments-slice/actions'
import { getEmojiForComment } from '../../../api/emoji-api'

const emojiesDataTransformer = (data: EmojiesType[]) => {
  const result: EmojiesForComment[] = []
  data.forEach(item => {
    const temp = result.findIndex(v => v.code === item.emoji.code)
    if (temp > -1) {
      result[temp].count++
    } else {
      result.push({ code: item.emoji.code, count: 1 } as EmojiesForComment)
    }
  })
  return result
}

export const TopicCommentItem = memo(
  forwardRef<HTMLDivElement, TopicCommentItemType>(
    ({ text, author, date, id, topicId, replyComments, isReply }, ref) => {
      const dispatch = useAppDispatch()

      const [isOpenModal, setIsOpenModal] = useState(false)
      const [message, setMessage] = useState('')
      const [user, setUser] = useState<IUser | null>(null)
      const [emojiesForComment, setEmojiesForComment] = useState<
        EmojiesForComment[]
      >([])
      const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)

      const { foundUsers } = useAppSelector(userSelector)

      const foundUser = useMemo(
        () => foundUsers.find(user => user.id === author),
        [author]
      )

      useEffect(() => {
        getEmojiForComment(id).then(data => {
          setEmojiesForComment(emojiesDataTransformer(data.data))
        })
      }, [id, shouldUpdate])

      useEffect(() => {
        if (!foundUser) {
          dispatch(getUserThunk(author))
        } else {
          setUser(foundUser)
        }
      }, [foundUser])

      const handleOpenModal = useCallback(() => setIsOpenModal(() => true), [])
      const handleCloseModal = useCallback(() => {
        dispatch(resetCommentError())
        setIsOpenModal(() => false)
      }, [])

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
              src={(user?.avatar && makeResourcePath(user.avatar)) || ''}
              className={styles.avatar}
            />
            <Box className={styles.box}>
              <Box>
                <Box position="relative">
                  <Typography variant="body1" color="secondary">
                    {user?.display_name || user?.first_name}
                  </Typography>
                  <TopicCommentMenu
                    id={id}
                    shouldUpdate={shouldUpdate}
                    setShouldUpdate={setShouldUpdate}
                  />
                </Box>
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
              <Box>
                {emojiesForComment.map(item => (
                  <Chip
                    avatar={<Avatar>{item.code}</Avatar>}
                    label={item.count}></Chip>
                ))}
              </Box>
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
