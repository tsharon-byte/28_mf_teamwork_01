import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILeaderboardState, IUserScore } from './types'
import IError from '../../../helpers/prepare-error/types'
import { LEADERBOARD_BATCH_SIZE } from './constants'
import { IRetrieveLeaderboardFulfilledPayload } from './thunks/retrieve-leaderboard-thunk/types'
import {
  createLeaderboardRecordThunk,
  retrieveLeaderboardThunk,
} from './thunks'

const initialState: ILeaderboardState = {
  loading: true,
  leaderboard: [],
  error: null,
  cursor: 0,
  hasMore: false,
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createLeaderboardRecordThunk.pending.type, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        createLeaderboardRecordThunk.fulfilled.type,
        (state, action: PayloadAction<IUserScore | undefined>) => {
          state.loading = false
          if (action.payload) {
            state.leaderboard.push(action.payload)
          }
          state.error = null
        }
      )
      .addCase(
        createLeaderboardRecordThunk.rejected.type,
        (state, action: PayloadAction<IError>) => {
          state.loading = false
          state.error = action.payload
        }
      )
      .addCase(retrieveLeaderboardThunk.pending, state => {
        state.loading = true
        if (!state.cursor) {
          state.leaderboard = []
        }
        state.error = null
        state.hasMore = false
      })
      .addCase(
        retrieveLeaderboardThunk.fulfilled,
        (
          state,
          action: PayloadAction<IRetrieveLeaderboardFulfilledPayload>
        ) => {
          const { cursor, results } = action.payload
          state.loading = false
          if (!cursor) {
            state.leaderboard = results
            state.cursor = 0
          } else {
            state.leaderboard = state.leaderboard.concat(results)
          }
          state.error = null
          state.hasMore = results.length === LEADERBOARD_BATCH_SIZE
          if (state.hasMore) {
            state.cursor += LEADERBOARD_BATCH_SIZE
          }
        }
      )
      .addCase(
        retrieveLeaderboardThunk.rejected.type,
        (state, action: PayloadAction<IError>) => {
          state.loading = false
          state.error = action.payload
        }
      )
  },
})

export default leaderboardSlice
