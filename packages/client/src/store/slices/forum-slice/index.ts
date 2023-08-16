import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getChatListThunk, createChatThunk } from './thunks'
import { ChatType, ForumInitialState } from './types'
import { IError } from '../user-slice/types'

const initialState: ForumInitialState = {
  chats: [],
  loading: false,
  error: null,
  currentChat: null,
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    getCurrentChat(state, { payload }: PayloadAction<string>) {
      const currentId = Number(payload)
      const chat = state.chats.find(chat => chat.id === currentId)
      if (chat) {
        state.currentChat = chat
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        getChatListThunk.fulfilled,
        (state, { payload }: PayloadAction<ChatType[]>) => {
          state.chats = payload
          state.loading = false
        }
      )
      .addCase(getChatListThunk.pending, state => {
        state.loading = true
      })
      .addCase(
        getChatListThunk.rejected.type,
        (state, { payload }: PayloadAction<IError>) => {
          state.loading = false
          state.error = payload
        }
      )
      .addCase(createChatThunk.fulfilled, state => {
        state.loading = false
      })
      .addCase(createChatThunk.pending, state => {
        state.loading = true
      })
      .addCase(
        createChatThunk.rejected.type,
        (state, { payload }: PayloadAction<IError>) => {
          state.loading = false
          state.error = payload
        }
      )
  },
})

export default forumSlice
