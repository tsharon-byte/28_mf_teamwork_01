import { getUser } from '../../api/auth-api'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../utils/constants'
import { FC, useEffect } from 'react'
import { AxiosError } from 'axios'

const ProtectedRoute: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        await getUser()
      } catch (error) {
        if (
          error instanceof AxiosError &&
          error.response &&
          error.response.data.reason === 'Cookie is not valid'
        ) {
          navigate(ROUTE_PATH.LOGIN)
        }
      }
    })()
  }, [])

  return null
}

export default ProtectedRoute
