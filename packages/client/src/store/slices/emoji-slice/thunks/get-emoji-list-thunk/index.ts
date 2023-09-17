import { beInstance } from '../../../../../utils/http-transport'
import { BE_EMOJI_LIST_URL } from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { EmojiType } from '../../types'
import { isAxiosError } from 'axios'
import { logDOM } from '@testing-library/react'

const getEmojiListThunk = createAsyncThunk(
  '/emoji/getEmojiListThunk',
  async (_, thunkAPI) => {
    try {
      const response = await beInstance.get<EmojiType[]>(BE_EMOJI_LIST_URL)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        return thunkAPI.rejectWithValue({
          status: error.response?.status,
          message: error.response?.data?.reason,
        })
      }
      return thunkAPI.rejectWithValue({
        message: 'Не удалось получить список эмодзи',
      })
    }
  }
)

export default getEmojiListThunk
