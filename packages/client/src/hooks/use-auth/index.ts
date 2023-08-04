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

  const login = useCallback((data: TLoginData) => {
    loginRequest(data)
      .then(response => {
        switch (response.status) {
          case 200: {
            navigate(ROUTE_PATH.HOME)
            break
          }
          case 400: {
            if (response.data.reason === 'User already in system') {
              navigate(ROUTE_PATH.HOME)
            }
            break
          }
          case 401: {
            navigate(ROUTE_PATH.LOGIN)
            break
          }
          case 500: {
            navigate(ROUTE_PATH.ERROR)
            break
          }
          default: {
            throw new Error(`Необработанный код ответа ${response.status}`)
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const logout = useCallback(() => {
    logoutRequest()
      .then(response => {
        switch (response.status) {
          case 200: {
            navigate(ROUTE_PATH.HOME)
            break
          }
          case 500: {
            navigate(ROUTE_PATH.ERROR)
            break
          }
          default: {
            throw new Error(`Необработанный код ответа ${response.status}`)
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return { login, logout }
}

export default useAuth
