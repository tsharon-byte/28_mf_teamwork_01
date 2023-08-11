import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserState, IUser, IError } from './types'
import {
  retrieveUserThunk,
  changeAvatarThunk,
  changePasswordThunk,
} from './thunks'

const initialState: IUserState = {
  loading: false,
  user: null,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(retrieveUserThunk.pending.type, state => {
        state.loading = true
        state.user = null
        state.error = null
      })
      .addCase(
        retrieveUserThunk.fulfilled.type,
        (state, action: PayloadAction<IUser>) => {
          state.loading = false
          state.user = action.payload
          state.error = null
        }
      )
      .addCase(
        retrieveUserThunk.rejected.type,
        (state, action: PayloadAction<IError>) => {
          state.loading = false
          state.user = null
          state.error = action.payload
        }
      )
      .addCase(
        changeAvatarThunk.fulfilled.type,
        (state, action: PayloadAction<IUser>) => {
          if (state.user) {
            state.user.avatar = action.payload.avatar
          }
        }
      )
      .addCase(changePasswordThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(changePasswordThunk.fulfilled, state => {
        state.loading = false
        state.error = null
      })
      .addCase(
        changePasswordThunk.rejected.type,
        (state, action: PayloadAction<IError>) => {
          state.loading = false
          state.error = action.payload
        }
      )
  },
})

export default userSlice
