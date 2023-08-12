import {
  ChangeEvent,
  FC,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { forumSelector } from '../../store/slices/forum-slice/selectors'
import { getCurrentChat } from '../../store/slices/forum-slice/actions'
import { retrieveChatsThunk } from '../../store/slices/forum-slice/thunks'
import { CircularProgress, Typography } from '@mui/material'
import { TopicTextField } from '../../components/topic-components/topic-text-field'
import { TopicCommentstLayout } from '../../components/topic-components/topic-comments-layout'
import { useUser } from '../../hooks'
import { CommentType } from '../../components/topic-components/topic-comments-layout/types'

const ForumTopic: FC = () => {
  const params = useParams()
  const { topicId } = params
  const { chats, loading, currentChat } = useAppSelector(forumSelector)
  const { user } = useUser()
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState<CommentType[]>([])
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (chats.length === 0) {
      dispatch(retrieveChatsThunk()).then(() => {
        dispatch(getCurrentChat(topicId))
      })
    } else {
      dispatch(getCurrentChat(topicId))
    }
  }, [chats, topicId, dispatch])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.currentTarget
      setMessage(value)
    },
    []
  )
  const handleKeyDown: KeyboardEventHandler = useCallback(
    e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleAddComment()
      }
    },
    [comments, message]
  )
  const handleAddComment = useCallback(() => {
    if (message.trim() !== '' && user) {
      const date = new Date().toLocaleString('ru-Ru', {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      const newComment = {
        id: crypto.randomUUID(),
        text: message,
        author: user.login || '',
        date,
      }
      setComments([...comments, newComment])
      setMessage('')
    }
  }, [comments, message])

  if (!currentChat) {
    return null
  }
  return (
    <TopicCommentstLayout
      comments={comments}
      header={
        loading ? (
          <CircularProgress />
        ) : (
          <Typography variant="h5">{currentChat?.title}</Typography>
        )
      }
      footer={
        <TopicTextField
          message={message}
          handleAddComment={handleAddComment}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
        />
      }
    />
  )
}

export default ForumTopic
