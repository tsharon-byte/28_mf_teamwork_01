import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserState, IUser, IError } from './types'
import {
  retrieveUserThunk,
  changeAvatarThunk,
  changePasswordThunk,
} from './thunks'
import {
  getFromLocalStorage,
  setToStorage,
} from '../../../utils/localStorageHelper'
import { Nullable } from '../../../types'

const initialState: IUserState = {
  loading: false,
  user: null,
  error: null,
}

const USER_IN_LOCAL_STORAGE = 'user'

const getUserFromStorage = () => {
  const state = { ...initialState }
  state.user = getFromLocalStorage(USER_IN_LOCAL_STORAGE)
  return state
}

const setUserToStorage = (user: Nullable<IUser>) => {
  setToStorage(USER_IN_LOCAL_STORAGE, JSON.stringify(user))
}

const userSlice = createSlice({
  name: 'user',
  initialState: getUserFromStorage(),
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
        setUserToStorage(state.user)
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
          setUserToStorage(state.user)
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
  },
})

export default userSlice
