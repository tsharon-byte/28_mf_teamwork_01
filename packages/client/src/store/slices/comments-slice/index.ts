import { TComments, TCommentsInitialState } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IError from '../../../helpers/prepare-error/types'
import { createCommentsThunk, getCommentsById } from './thunks'

const initialState: TCommentsInitialState = {
  comments: {
    count: 0,
    rows: [],
  },
  loading: false,
  error: null,
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetCommentError(state) {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        getCommentsById.fulfilled,
        (state, { payload }: PayloadAction<TComments>) => {
          state.comments = payload
          state.loading = false
        }
      )
      .addCase(getCommentsById.pending, state => {
        state.loading = true
      })
      .addCase(
        getCommentsById.rejected.type,
        (state, { payload }: PayloadAction<IError>) => {
          state.loading = false
          state.error = payload
        }
      )
      .addCase(createCommentsThunk.fulfilled, state => {
        state.loading = false
      })
      .addCase(createCommentsThunk.pending, state => {
        state.loading = true
      })
      .addCase(
        createCommentsThunk.rejected.type,
        (state, { payload }: PayloadAction<IError>) => {
          state.loading = false
          state.error = payload
        }
      )
  },
})

export default commentsSlice
