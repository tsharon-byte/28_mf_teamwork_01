import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  logout as logoutRequest,
  login as loginRequest,
  registration as registrationRequest,
} from '../../api/auth-api'
import { TLoginData, TRegistrationData } from '../../api/auth-api/type'
import { ROUTE_PATH } from '../../utils/constants'
import { isAxiosError } from 'axios'
import { toast } from 'react-toastify'

const useAuth = () => {
  const navigate = useNavigate()

  const registration = useCallback(async (data: TRegistrationData) => {
    try {
      const response = await registrationRequest(data)

      if (response && response.status === 200) {
        return navigate(ROUTE_PATH.HOME)
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.data.reason === 'User already in system') {
          return navigate(ROUTE_PATH.HOME)
        } else {
          toast.error(error.response.data.reason)
        }
      }
    }
  }, [])

  const login = useCallback(async (data: TLoginData) => {
    try {
      const response = await loginRequest(data)

      if (response && response.status === 200) {
        return navigate(ROUTE_PATH.HOME)
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.data.reason === 'User already in system') {
          return navigate(ROUTE_PATH.HOME)
        } else {
          toast.error(error.response.data.reason)
        }
      }
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      const response = await logoutRequest()

      if (response && response.status === 200) {
        return navigate(ROUTE_PATH.HOME)
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.reason)
      }
    }
  }, [])

  return { login, logout, registration }
}

export default useAuth
