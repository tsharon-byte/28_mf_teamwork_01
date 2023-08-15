import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { retrieveUserThunk } from '../../store/slices/user-slice/thunks'
import { userSelector } from '../../store/slices/user-slice/selectors'

const useUser = () => {
  const dispatch = useAppDispatch()
  const { loading, user, error } = useAppSelector(userSelector)

  useEffect(() => {
    if (!user) {
      dispatch(retrieveUserThunk())
    }
  }, [user])

  return {
    loading,
    user,
    error,
  }
}

export default useUser
