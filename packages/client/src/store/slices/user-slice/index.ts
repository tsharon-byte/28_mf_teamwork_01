import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserState, IUser } from './types'
import { retrieveUserThunk } from './thunks'

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
        (state, action: PayloadAction<string>) => {
          state.loading = false
          state.user = null
          state.error = action.payload
        }
      )
  },
})

export default userSlice
