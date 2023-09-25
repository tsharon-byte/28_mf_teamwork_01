import { beInstance } from '../../../../../utils/http-transport'
import { COMMENTS_URL } from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'
import { TComments } from '../../types'

const getCommentsByIdThunk = createAsyncThunk(
  '/comments/getCommentsByIdThunk',
  async (_, thunkAPI) => {
    try {
      const response = await beInstance.get<TComments>(COMMENTS_URL)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        return thunkAPI.rejectWithValue({
          status: error.response?.status,
          message: error.response?.data?.reason,
        })
      }
      return thunkAPI.rejectWithValue({
        message: 'Не удалось получить список комментариев',
      })
    }
  }
)

export default getCommentsByIdThunk
