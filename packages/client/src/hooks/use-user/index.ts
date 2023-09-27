import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  retrieveUserThunk,
  updateUserThunk,
} from '../../store/slices/user-slice/thunks'
import { userSelector } from '../../store/slices/user-slice/selectors'
import { IUser } from '../../store/slices/user-slice/types'
import useToast from '../use-toast'

const useUser = (toastifyError: boolean | undefined = false) => {
  const dispatch = useAppDispatch()
  const { loading, user, error } = useAppSelector(userSelector)

  useEffect(() => {
    if (!user) {
      dispatch(retrieveUserThunk())
    }
  }, [user])

  const updateUser = async (data: Partial<IUser>) => {
    dispatch(updateUserThunk(data))
  }

  useToast(toastifyError ? error?.message : '')

  return {
    loading,
    user,
    error,
    updateUser,
  }
}

export default useUser
