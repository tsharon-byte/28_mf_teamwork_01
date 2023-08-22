import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../../utils/http-transport'
import { LEADERBOARD_RECORD_CREATE_URL, TEAM_NAME } from './constants'
import { RATING_FIELD_NAME } from '../constants'
import { prepareError } from '../../../../../helpers'
import { IUserScore } from '../../types'
import { ThunkApiConfig } from '../../../types'

const createLeaderboardRecordThunk = createAsyncThunk<
  IUserScore | undefined,
  number,
  ThunkApiConfig
>(
  '/leaderboard/createLeaderboardRecordThunk',
  async (score, { getState, rejectWithValue }) => {
    const { user } = getState().user
    if (user) {
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
          return { user, score }
        }
      } catch (error) {
        return rejectWithValue(prepareError(error))
      }
    } else {
      return rejectWithValue({
        status: 401,
        message: 'Unauthorized',
      })
    }
  }
)

export default createLeaderboardRecordThunk
