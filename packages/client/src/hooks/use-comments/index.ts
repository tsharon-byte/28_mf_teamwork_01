import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../utils/constants'
import commentsSelector from '../../store/slices/comments-slice/selectors/comments-selector'
import getCommentsByIdThunk from '../../store/slices/comments-slice/thunks/get-comments-by-id-thunk'
import useToast from '../use-toast'

const useComments = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { comments, loading, error } = useAppSelector(commentsSelector)

  useToast(error?.message)

  useEffect(() => {
    if (comments.rows.length === 0) {
      dispatch(getCommentsByIdThunk())
        .unwrap()
        .catch(() => {
          if (error?.status === 500) {
            navigate(ROUTE_PATH.SERVER_ERROR)
          }
        })
    }
  }, [])

  return {
    comments,
    loadingComments: loading,
    error,
  }
}

export default useComments
