import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { userSelector } from '../../store/slices/user-slice/selectors'
import { useCallback, useEffect } from 'react'
import {
  changeThemeThunk,
  retrieveThemeThunk,
} from '../../store/slices/user-slice/thunks'
import { userSlice } from '../../store/slices'

const useTheme = () => {
  const dispatch = useAppDispatch()
  const { theme, user } = useAppSelector(userSelector)
  useEffect(() => {
    if (user) {
      dispatch(retrieveThemeThunk(user?.id))
    }
  }, [user])

  const toggleThemeCallback = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    if (user) {
      dispatch(changeThemeThunk({ theme: newTheme, userId: user?.id }))
    } else {
      dispatch(userSlice.actions.changeTheme(newTheme))
    }
  }, [theme, user])
  return {
    theme,
    toggleThemeCallback,
  }
}

export default useTheme
