import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserState, IUser } from './types'
import IError from '../../../helpers/prepare-error/types'
import {
  retrieveUserThunk,
  changeAvatarThunk,
  changePasswordThunk,
  getUserThunk,
} from './thunks'
import {
  deleteUserFromStorage,
  getUserFromStorage,
  setUserToStorage,
} from './helpers'

const initialState: IUserState = {
  loading: false,
  user: null,
  error: null,
  foundUsers: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState: getUserFromStorage(initialState),
  reducers: {
    resetUser(state) {
      state.loading = initialState.loading
      state.user = initialState.user
      state.error = initialState.error
      setUserToStorage(state.user)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(retrieveUserThunk.pending.type, state => {
        state.loading = true
        state.user = null
        state.error = null
        deleteUserFromStorage()
      })
      .addCase(
        retrieveUserThunk.fulfilled.type,
        (state, action: PayloadAction<IUser>) => {
          state.loading = false
          state.user = action.payload
          state.error = null
          setUserToStorage(state.user)
        }
      )
      .addCase(
        retrieveUserThunk.rejected.type,
        (state, action: PayloadAction<IError>) => {
          state.loading = false
          state.user = null
          state.error = action.payload
          deleteUserFromStorage()
        }
      )
      .addCase(
        changeAvatarThunk.fulfilled.type,
        (state, action: PayloadAction<IUser>) => {
          if (state.user) {
            state.user.avatar = action.payload.avatar
            setUserToStorage(state.user)
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
      .addCase(getUserThunk.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        getUserThunk.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.loading = false
          state.error = null
          state.foundUsers = [...state.foundUsers, action.payload]
        }
      )
      .addCase(
        getUserThunk.rejected.type,
        (state, action: PayloadAction<IError>) => {
          state.loading = false
          state.error = action.payload
        }
      )
  },
})

export default userSlice
