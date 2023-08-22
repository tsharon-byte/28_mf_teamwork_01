import { useCallback, useEffect, UIEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../utils/constants'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import leaderboardSelector from '../../store/slices/leaderboard-slice/selectors/leaderboard-selector'
import {
  retrieveLeaderboardThunk,
  createLeaderboardRecordThunk,
} from '../../store/slices/leaderboard-slice/thunks'

const useLeaderboard = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, leaderboard, error, hasMore } =
    useAppSelector(leaderboardSelector)

  useEffect(() => {
    !leaderboard.length && dispatch(retrieveLeaderboardThunk())
  }, [])

  const createLeaderboardRecord = useCallback(async (score: number) => {
    dispatch(createLeaderboardRecordThunk(score))
  }, [])

  useEffect(() => {
    if (error) {
      error.status === 401 && navigate(ROUTE_PATH.LOGIN)
      error.status === 500 && navigate(ROUTE_PATH.ERROR)
      toast.error(error.message)
    }
  }, [error])

  const infiniteScroll: UIEventHandler<HTMLDivElement> = event => {
    const container = event.currentTarget
    if (
      container.offsetHeight + container.scrollTop >= container.scrollHeight &&
      hasMore
    ) {
      dispatch(retrieveLeaderboardThunk())
    }
  }

  return {
    loading,
    leaderboard,
    error,
    hasMore,
    createLeaderboardRecord,
    infiniteScroll,
  }
}

export default useLeaderboard
