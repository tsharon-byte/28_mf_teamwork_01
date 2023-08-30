import { useEffect, UIEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ROUTE_PATH } from '../../utils/constants'
import { axiosInstance } from '../../utils/http-transport'
import {
  LEADERBOARD_RECORD_LIST_URL,
  LEADERBOARD_RECORD_CREATE_URL,
  TEAM_NAME,
  RATING_FIELD_NAME,
  LEADERBOARD_BATCH_SIZE,
} from './constants'
import { prepareError } from '../../helpers'
import IError from '../../helpers/prepare-error/types'
import { ILeaderboardRecord, IUserScore } from './types'
import useUser from '../use-user'

const useLeaderboard = (retrieveLeaderboardOnMount = true) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [leaderboard, setLeaderboard] = useState<IUserScore[]>([])
  const [error, setError] = useState<IError>()
  const [hasMore, setHasMore] = useState(false)
  const [cursor, setCursor] = useState(0)
  const { user } = useUser()

  useEffect(() => {
    retrieveLeaderboardOnMount && retrieveLeaderboard()
  }, [retrieveLeaderboardOnMount])

  const retrieveLeaderboardPending = () => {
    requestPending()
    setHasMore(false)
    !cursor && setLeaderboard([])
  }

  const retrieveLeaderboardFulfilled = (
    cursor: number,
    results: IUserScore[]
  ) => {
    setLoading(false)
    if (!cursor) {
      setLeaderboard(results)
      setCursor(0)
    } else {
      setLeaderboard(leaderboard => leaderboard.concat(results))
    }
    setError(undefined)
    const hasMore = results.length === LEADERBOARD_BATCH_SIZE
    setHasMore(hasMore)
    if (hasMore) {
      setCursor(cursor => cursor + LEADERBOARD_BATCH_SIZE)
    }
  }

  const requestRejected = (error: IError) => {
    setLoading(false)
    setError(error)
    error.status === 401 && navigate(ROUTE_PATH.LOGIN)
    error.status === 500 && navigate(ROUTE_PATH.SERVER_ERROR)
    toast.error(error.message)
  }

  const retrieveLeaderboard = async () => {
    retrieveLeaderboardPending()
    try {
      const response = await axiosInstance.post<ILeaderboardRecord[]>(
        LEADERBOARD_RECORD_LIST_URL,
        {
          ratingFieldName: RATING_FIELD_NAME,
          cursor,
          limit: LEADERBOARD_BATCH_SIZE,
        }
      )
      const requestData = JSON.parse(response.config.data)
      retrieveLeaderboardFulfilled(
        requestData.cursor,
        response.data.map(record => ({
          user: record.data.user,
          score: record.data[RATING_FIELD_NAME],
        }))
      )
    } catch (error) {
      return requestRejected(prepareError(error))
    }
  }

  const requestPending = () => {
    setLoading(true)
    setError(undefined)
  }

  const createLeaderboardRecord = async (score: number) => {
    if (user) {
      requestPending()
      try {
        const response = await axiosInstance.post(
          LEADERBOARD_RECORD_CREATE_URL,
          {
            data: {
              user,
              [RATING_FIELD_NAME]: score,
            },
            ratingFieldName: RATING_FIELD_NAME,
            teamName: TEAM_NAME,
          }
        )
        if (response.status === 200) {
          toast.success('Ваш результат обновился на доске лидеров')
        }
        setLoading(false)
      } catch (error) {
        requestRejected(prepareError(error))
      }
    } else {
      requestRejected({
        status: 401,
        message: 'Unauthorized',
      })
    }
  }

  const infiniteScroll: UIEventHandler<HTMLDivElement> = event => {
    const container = event.currentTarget
    if (
      container.offsetHeight + container.scrollTop >= container.scrollHeight &&
      hasMore
    ) {
      retrieveLeaderboard()
    }
  }

  return {
    loading,
    leaderboard,
    error,
    hasMore,
    retrieveLeaderboard,
    createLeaderboardRecord,
    infiniteScroll,
  }
}

export default useLeaderboard
