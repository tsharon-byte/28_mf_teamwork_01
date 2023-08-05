import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  logout as logoutRequest,
  login as loginRequest,
} from '../../api/auth-api'
import { TLoginData } from '../../api/auth-api/type'
import { ROUTE_PATH } from '../../utils/constants'

const useAuth = () => {
  const navigate = useNavigate()

  const login = useCallback(async (data: TLoginData) => {
    try {
      const response = await loginRequest(data)
      switch (response.status) {
        case 200: {
          return navigate(ROUTE_PATH.HOME)
        }
        case 400: {
          if (response.data.reason === 'User already in system') {
            return navigate(ROUTE_PATH.HOME)
          }
          throw new Error(`Bad request: ${response.data.reason}`)
        }
        case 401: {
          return navigate(ROUTE_PATH.LOGIN)
        }
        case 500: {
          return navigate(ROUTE_PATH.ERROR)
        }
        default: {
          throw new Error(`Unprocessable response code: ${response.status}`)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      const response = await logoutRequest()
      switch (response.status) {
        case 200: {
          return navigate(ROUTE_PATH.HOME)
        }
        case 500: {
          return navigate(ROUTE_PATH.ERROR)
        }
        default: {
          throw new Error(`Unprocessable response code: ${response.status}`)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  return { login, logout }
}

export default useAuth
