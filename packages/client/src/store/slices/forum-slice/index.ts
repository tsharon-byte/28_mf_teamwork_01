import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getChatListThunk, createChatThunk } from './thunks'
import { ForumInitialState, TChatList } from './types'
import IError from '../../../helpers/prepare-error/types'

const initialState: ForumInitialState = {
  chats: {
    count: 0,
    rows: [],
  },
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
      const chat = state.chats.rows.find(chat => chat.id === currentId)
      if (chat) {
        state.currentChat = chat
      }
    },
    resetChatError(state) {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        getChatListThunk.fulfilled,
        (state, { payload }: PayloadAction<TChatList>) => {
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
