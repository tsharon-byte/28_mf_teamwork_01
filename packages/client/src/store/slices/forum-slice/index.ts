import { createSlice } from '@reduxjs/toolkit'
import { retrieveChatsThunk } from './thunks'
import { ChatType } from './types'
import { Nullable } from '../../../types'

interface InitialState {
  chats: ChatType[] | []
  loading: boolean
  error: Nullable<string>
}

const initialState: InitialState = {
  chats: [],
  loading: false,
  error: null,
}
const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(retrieveChatsThunk.fulfilled, (state, { payload }) => {
        state.chats = payload
        state.loading = false
      })
      .addCase(retrieveChatsThunk.pending, state => {
        state.loading = true
      })
      .addCase(retrieveChatsThunk.rejected, (state, { error }) => {
        state.loading = false
        if (error) {
          state.error = error as string
        }
      })
  },
})

export default forumSlice
