import {
  ChangeEvent,
  FC,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { getCurrentChat } from '../../store/slices/forum-slice/actions'
import { TopicTextField } from '../../components/topic-components/topic-text-field'
import { TopicCommentList } from '../../components/topic-components/topic-comment-list'
import { useUser } from '../../hooks'
import { CommentType } from '../../components/topic-components/topic-comment-list/types'
import { useChats } from '../../hooks'
import { TopicHeader } from '../../components/topic-components/topic-header'
import { makeResourcePath } from '../../helpers'

const ForumTopic: FC = () => {
  const params = useParams()
  const { topicId } = params
  const { chats, loading, currentChat } = useChats()
  const { user } = useUser()
  const [message, setMessage] = useState('')
  const [comments, setComments] = useState<CommentType[]>([])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
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
      const date = new Date().toISOString().split('T')[0]
      const newComment = {
        id: crypto.randomUUID(),
        text: message,
        author: user.login || '',
        date,
        avatar: user.avatar || '',
      }
      setComments([...comments, newComment])
      setMessage('')
    }
  }, [comments, message])
  const handleNavigate = useCallback(() => {
    navigate(-1)
  }, [])
  if (!currentChat) {
    return null
  }
  return (
    <TopicCommentList
      title={currentChat.title}
      user={user}
      comments={comments}
      header={
        <TopicHeader
          callback={handleNavigate}
          loading={loading}
          title="join the discussion"
        />
      }
      footer={
        <TopicTextField
          placeholder="Добавить новый комментарий..."
          avatar={(user?.avatar && makeResourcePath(user.avatar)) || ''}
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
