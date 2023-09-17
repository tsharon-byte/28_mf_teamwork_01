import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { EmojiInitialState, EmojiType } from './types'
import IError from '../../../helpers/prepare-error/types'
import { getEmojiListThunk } from './thunks'

const initialState: EmojiInitialState = {
  emojies: [],
  loading: false,
  error: null,
}

const emojiSlice = createSlice({
  name: 'emoji',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        getEmojiListThunk.fulfilled,
        (state, { payload }: PayloadAction<EmojiType[]>) => {
          state.emojies = payload
          state.loading = false
        }
      )
      .addCase(getEmojiListThunk.pending, state => {
        state.loading = true
      })
      .addCase(
        getEmojiListThunk.rejected.type,
        (state, { payload }: PayloadAction<IError>) => {
          state.loading = false
          state.error = payload
        }
      )
  },
})

export default emojiSlice
