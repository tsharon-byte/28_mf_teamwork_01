import {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getCurrentChat } from '../../store/slices/forum-slice/actions'
import { TopicTextField } from '../../components/topic-components/topic-text-field'
import { TopicCommentList } from '../../components/topic-components/topic-comment-list'
import { useChats } from '../../hooks'
import { TopicHeader } from '../../components/topic-components/topic-header'
import { makeResourcePath } from '../../helpers'
import { createCommentsThunk } from '../../store/slices/comments-slice/thunks'
import useComments from '../../hooks/use-comments'
import getCommentsByIdThunk from '../../store/slices/comments-slice/thunks/get-comments-by-id-thunk'
import { userSelector } from '../../store/slices/user-slice/selectors'
import getUserThunk from '../../store/slices/user-slice/thunks/get-user-thunk'
import { TComments } from '../../store/slices/comments-slice/types'

const ForumTopic: FC = () => {
  const params = useParams()
  const { topicId } = params
  const { chats, loading, currentChat } = useChats()

  const { foundUser } = useAppSelector(userSelector)
  const [message, setMessage] = useState('')
  const { comments } = useComments()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const filteredComments: TComments = useMemo(() => {
    const rows = comments.rows.filter(
      comment => comment.topicId === Number(topicId)
    )
    return { count: rows.length, rows }
  }, [comments, topicId])

  useEffect(() => {
    if (!foundUser && currentChat) {
      dispatch(getUserThunk(currentChat.authorId))
    }
  }, [currentChat])

  useEffect(() => {
    if (chats.rows.length !== 0 && topicId) {
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
    (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleAddComment(e)
      }
    },
    [message]
  )
  const handleAddComment = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
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
  const handleNavigate = useCallback(() => {
    navigate(-1)
  }, [])
  if (!currentChat) {
    return null
  }
  return (
    <TopicCommentList
      title={currentChat.name}
      user={foundUser}
      comments={filteredComments}
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
          avatar={
            (foundUser?.avatar && makeResourcePath(foundUser.avatar)) || ''
          }
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
