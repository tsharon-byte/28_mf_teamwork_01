import {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEventHandler,
  KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { TopicTextField } from '../../components/topic-components/topic-text-field'
import { TopicCommentList } from '../../components/topic-components/topic-comment-list'
import { useChats, useUser, useTheme } from '../../hooks'
import { makeResourcePath } from '../../helpers'
import { createCommentsThunk } from '../../store/slices/comments-slice/thunks'
import useComments from '../../hooks/use-comments'
import getCommentsByIdThunk from '../../store/slices/comments-slice/thunks/get-comments-by-id-thunk'
import { TComments } from '../../store/slices/comments-slice/types'
import { Title } from '../../components'

const ForumTopic: FC = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const { topicId } = params
  const { theme, toggleThemeCallback } = useTheme()
  const { chats } = useChats()
  const { user } = useUser()
  const { comments } = useComments()

  const [message, setMessage] = useState('')

  const commentByTopicId: TComments = useMemo(() => {
    const rows = comments.rows.filter(
      comment => comment.topicId === Number(topicId)
    )
    return { count: rows.length, rows }
  }, [comments, topicId])

  const currentChat = useMemo(
    () => chats.rows.find(chat => chat.id === Number(topicId)),
    [topicId, chats]
  )

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.currentTarget
      setMessage(value)
    },
    []
  )
  const handleKeyDown: KeyboardEventHandler = useCallback(
    (e: KeyboardEvent<HTMLFormElement | HTMLDivElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleAddComment(e)
      }
    },
    [message]
  )
  const handleAddComment = useCallback(
    (e: FormEvent<HTMLFormElement | HTMLDivElement>) => {
      e.preventDefault()
      if (message.trim() !== '' && topicId) {
        dispatch(
          createCommentsThunk({
            id: Number(topicId),
            parentId: null,
            text: message,
          })
        )
          .unwrap()
          .then(() => {
            setMessage('')
            dispatch(getCommentsByIdThunk())
          })
      }
    },
    [message]
  )
  if (!currentChat) {
    return null
  }
  return (
    <TopicCommentList
      title={currentChat.name}
      comments={commentByTopicId}
      description={currentChat.description || null}
      authorId={currentChat.authorId}
      theme={theme}
      toggleTheme={toggleThemeCallback}
      header={<Title>join the discussion</Title>}
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
