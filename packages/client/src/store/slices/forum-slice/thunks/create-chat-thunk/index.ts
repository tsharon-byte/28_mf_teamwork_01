import { axiosInstance } from '../../../../../utils/http-transport'
import { CHAT_LIST_URL } from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ChatType } from '../../types'
import { isAxiosError } from 'axios'

const createChatThunk = createAsyncThunk(
  '/chats/createChatThunk',
  async (title: string, thunkAPI) => {
    try {
      console.log(title)
      const response = await axiosInstance.post<ChatType[]>(CHAT_LIST_URL, {
        title,
      })
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        return thunkAPI.rejectWithValue({
          status: error.response?.status,
          message: error.response?.data?.reason,
        })
      }
      return thunkAPI.rejectWithValue({
        message: 'Не удалось создать чат',
      })
    }
  }
)

export default createChatThunk
