import { axiosInstance } from '../../../../../utils/http-transport'
import { CREATE_CHAT_URL } from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ChatType } from '../../types'

const createChatThunk = createAsyncThunk(
  '/chats/createChatThunk',
  async (title: string, thunkAPI) => {
    try {
      console.log(title)
      const response = await axiosInstance.post<ChatType[]>(CREATE_CHAT_URL, {
        title,
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось создать чат')
    }
  }
)

export default createChatThunk
