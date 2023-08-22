import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../../utils/http-transport'
import { LEADERBOARD_RECORD_LIST_URL } from './constants'
import { RATING_FIELD_NAME } from '../constants'
import { LEADERBOARD_BATCH_SIZE } from '../../constants'
import { prepareError } from '../../../../../helpers'
import { ThunkApiConfig } from '../../../types'
import {
  ILeaderboardRecord,
  IRetrieveLeaderboardFulfilledPayload,
} from './types'

const retrieveLeaderboardThunk = createAsyncThunk<
  IRetrieveLeaderboardFulfilledPayload,
  undefined,
  ThunkApiConfig
>(
  '/leaderboard/retrieveLeaderboardThunk',
  async (_, { getState, rejectWithValue }) => {
    const { cursor } = getState().leaderboard
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
      return {
        cursor: requestData.cursor,
        results: response.data.map(record => ({
          user: record.data.user,
          score: record.data[RATING_FIELD_NAME],
        })),
      }
    } catch (error) {
      return rejectWithValue(prepareError(error))
    }
  }
)

export default retrieveLeaderboardThunk
