import { useState, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axiosInstance } from '../../utils/http-transport'
import {
  YANDEX_LOGIN_URL,
  CLIENT_ID_RETRIEVE_URL,
  REDIRECT_URI,
} from './constants'
import { ROUTE_PATH } from '../../utils/constants'
import { prepareError } from '../../helpers'
import { useAppDispatch } from '../../store/hooks'
import { retrieveUserThunk } from '../../store/slices/user-slice/thunks'
import { useUser } from '../../hooks'

const useOAuth = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [clientId, setClientId] = useState<string>('')
  const { user } = useUser()

  const yandexLogin = useCallback(async () => {
    const code = searchParams.get('code')
    searchParams.delete('code')
    setSearchParams(searchParams)
    if (!user && code) {
      try {
        const response = await axiosInstance.post(YANDEX_LOGIN_URL, {
          code,
          redirect_uri: REDIRECT_URI,
        })
        response.status === 200 && dispatch(retrieveUserThunk())
      } catch (error) {
        const err = prepareError(error)
        err.status === 401 && navigate(ROUTE_PATH.LOGIN)
        err.status === 500 && navigate(ROUTE_PATH.SERVER_ERROR)
        toast.error(err.message)
      }
    }
  }, [])

  const retrieveClientId = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `${CLIENT_ID_RETRIEVE_URL}?redirect_uri=${REDIRECT_URI}`
      )
      response.status === 200 && setClientId(response.data.service_id)
    } catch (error) {
      const err = prepareError(error)
      err.status === 500 && navigate(ROUTE_PATH.SERVER_ERROR)
      toast.error(err.message)
    }
  }, [])

  return {
    clientId,
    yandexLogin,
    retrieveClientId,
  }
}

export default useOAuth
