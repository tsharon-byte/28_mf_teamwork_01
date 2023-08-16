import {
  ChangeEvent,
  FC,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { getCurrentChat } from '../../store/slices/forum-slice/actions'
import { CircularProgress, Typography } from '@mui/material'
import { TopicTextField } from '../../components/topic-components/topic-text-field'
import { TopicCommentList } from '../../components/topic-components/topic-comment-list'
import { useUser } from '../../hooks'
import { CommentType } from '../../components/topic-components/topic-comment-list/types'
import { useChats } from '../../hooks'

const ForumTopic: FC = () => {
  const params = useParams()
  const { topicId } = params
  const { chats, loading, currentChat } = useChats()
  const { user } = useUser()
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState<CommentType[]>([])
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (chats.length !== 0 && topicId) {
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
    <TopicCommentList
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
