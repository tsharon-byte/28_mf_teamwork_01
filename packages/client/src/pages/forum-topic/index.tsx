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

const ForumTopic: FC = () => {
  const params = useParams()
  const { topicId } = params
  const { chats, loading, currentChat } = useAppSelector(forumSelector)
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState<{ id: string; text: string }[]>([])
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
      // if (e.key === 'Enter') {
      //   e.preventDefault()
      //   handleAddComment()
      // }
    },
    [comments, message]
  )
  const handleAddComment = useCallback(() => {
    if (message.trim() !== '') {
      const newComment = { id: crypto.randomUUID(), text: message }
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
