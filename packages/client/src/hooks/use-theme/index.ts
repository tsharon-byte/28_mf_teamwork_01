import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { userSelector } from '../../store/slices/user-slice/selectors'
import { useCallback } from 'react'
import {
  changeThemeThunk,
  retrieveThemeThunk,
} from '../../store/slices/user-slice/thunks'

export const useTheme = () => {
  const dispatch = useAppDispatch()
  const { theme, user } = useAppSelector(userSelector)
  const getTheme = useCallback(() => {
    if (user) {
      dispatch(retrieveThemeThunk(user?.id))
    }
  }, [])
  const toggleThemeCallback = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    if (user) {
      dispatch(changeThemeThunk({ theme: newTheme, userId: user?.id }))
    }
  }, [theme])
  return {
    theme,
    toggleThemeCallback,
    getTheme,
  }
}
