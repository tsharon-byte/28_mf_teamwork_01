import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  logout as logoutRequest,
  login as loginRequest,
  registration as registrationRequest,
  getUser,
  saveUserInBD,
} from '../../api/auth-api'
import { TLoginData, TRegistrationData } from '../../api/auth-api/type'
import { ROUTE_PATH } from '../../utils/constants'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../store/hooks'
import { userSlice } from '../../store/slices'
import { prepareError } from '../../helpers'
import { beInstance } from '../../utils/http-transport'
import { IUserData } from 'server/api/v1/types/user'
import { SELF_USER_URL } from '../../constants/urls'

const useAuth = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const registration = useCallback(async (data: TRegistrationData) => {
    try {
      const response = await registrationRequest(data)

      if (response.status === 200) {
        await saveUserInBD()
        navigate(ROUTE_PATH.HOME)
      }
    } catch (error) {
      const { status, message } = prepareError(error)
      status === 400 &&
        message === 'User already in system' &&
        navigate(ROUTE_PATH.HOME)
      status === 401 && navigate(ROUTE_PATH.LOGIN)
      status === 500 && navigate(ROUTE_PATH.SERVER_ERROR)
      toast.error(message, {
        toastId: message,
      })
    }
  }, [])

  const login = useCallback(async (data: TLoginData) => {
    try {
      const response = await loginRequest(data)

      if (response.status === 200) {
        await saveUserInBD()
        navigate(ROUTE_PATH.HOME)
      }
    } catch (error) {
      const { status, message } = prepareError(error)
      status === 400 &&
        message === 'User already in system' &&
        navigate(ROUTE_PATH.HOME)
      status === 401 && navigate(ROUTE_PATH.LOGIN)
      status === 500 && navigate(ROUTE_PATH.SERVER_ERROR)
      toast.error(message, {
        toastId: message,
      })
    }
  }, [])

  const logout = useCallback(async () => {
    navigate(ROUTE_PATH.HOME)
    try {
      const response = await logoutRequest()
      response.status === 200 && dispatch(userSlice.actions.resetUser())
    } catch (error) {
      const { status, message } = prepareError(error)
      status === 401 && dispatch(userSlice.actions.resetUser())
      status === 500 && navigate(ROUTE_PATH.SERVER_ERROR)
      toast.error(message, {
        toastId: message,
      })
    }
  }, [])

  return { login, logout, registration }
}

export default useAuth
