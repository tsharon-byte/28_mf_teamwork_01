import { getUser } from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../utils/constants'
import { FC } from 'react'

const ProtectedRoute: FC = () => {
  const navigate = useNavigate()

  getUser().catch(() => {
    navigate(ROUTE_PATH.LOGIN)
  })

  return <></>
}

export default ProtectedRoute
