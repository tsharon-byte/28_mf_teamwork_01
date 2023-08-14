import { axiosInstance } from '../../../../../utils/http-transport'
import { CHAT_LIST_URL } from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ChatType } from '../../types'
import { isAxiosError } from 'axios'

const getChatListThunk = createAsyncThunk(
  '/chats/getChatListThunk',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get<ChatType[]>(CHAT_LIST_URL)
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
