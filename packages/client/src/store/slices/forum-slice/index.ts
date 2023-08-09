import { createSlice } from '@reduxjs/toolkit'
import { retrieveChatsThunk, createChatThunk } from './thunks'
import { ChatType } from './types'
import { Nullable } from '../../../types'

interface InitialState {
  chats: ChatType[] | []
  loading: boolean
  error: Nullable<string>
  success: boolean
  currentChat: Nullable<ChatType>
}

const initialState: InitialState = {
  chats: [],
  loading: false,
  error: null,
  success: false,
  currentChat: null,
}
const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    getCurrentChat(state, { payload }) {
      const currentId = Number(payload)
      const chat = state.chats.find(chat => chat.id === currentId)
      if (chat) {
        state.currentChat = chat
      }
    },
  },
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
      .addCase(createChatThunk.fulfilled, state => {
        state.loading = false
        state.success = true
      })
      .addCase(createChatThunk.pending, state => {
        state.loading = true
      })
      .addCase(createChatThunk.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload as string
      })
  },
})

export default forumSlice
