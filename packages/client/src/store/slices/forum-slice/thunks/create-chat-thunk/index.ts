import { beInstance } from '../../../../../utils/http-transport'
import { CHAT_URL } from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'

const createChatThunk = createAsyncThunk(
  '/chats/createChatThunk',
  async (data: Record<string, string>, thunkAPI) => {
    try {
      const response = await beInstance.post(CHAT_URL, {
        name: data.name,
        description: data.description,
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
