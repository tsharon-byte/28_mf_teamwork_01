import { beInstance } from '../../../../../utils/http-transport'
import { CHAT_URL } from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TChatList } from '../../types'
import { isAxiosError } from 'axios'

const getChatListThunk = createAsyncThunk(
  '/chats/getChatListThunk',
  async (_, thunkAPI) => {
    try {
      const response = await beInstance.get<TChatList>(CHAT_URL)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        return thunkAPI.rejectWithValue({
          status: error.response?.status,
          message: error.response?.data?.reason,
        })
      }
      return thunkAPI.rejectWithValue({
        message: 'Не удалось получить список чатов',
      })
    }
  }
)

export default getChatListThunk
