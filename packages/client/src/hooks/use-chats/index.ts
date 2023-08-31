import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { forumSelector } from '../../store/slices/forum-slice/selectors'
import { getChatListThunk } from '../../store/slices/forum-slice/thunks'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../utils/constants'

const useChats = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { chats, currentChat, loading, error } = useAppSelector(forumSelector)
  useEffect(() => {
    if (chats.length === 0) {
      dispatch(getChatListThunk())
        .unwrap()
        .catch(() => {
          if (error?.status === 500) {
            navigate(ROUTE_PATH.SERVER_ERROR)
          }
        })
    }
  }, [])

  return {
    chats,
    currentChat,
    loading,
    error,
  }
}

export default useChats
