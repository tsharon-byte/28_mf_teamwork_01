import { axiosInstance } from '../../../../../utils/http-transport'
import { RETRIEVE_CHATS_URL } from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ChatType } from '../../types'

interface RetrieveChatsParams {
  offset?: number
  limit?: number
  title?: string
}
const defaultParams = {
  offset: 0,
  limit: 30,
  title: '',
}
const retrieveChatsThunk = createAsyncThunk(
  '/chats/retrieveChatsThunk',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get<ChatType[]>(RETRIEVE_CHATS_URL)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось получить список чатов')
    }
  }
)

export default retrieveChatsThunk
