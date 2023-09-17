import { beInstance } from '../../../../../utils/http-transport'
import { COMMENTS_URL } from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'

const createCommentsThunk = createAsyncThunk(
  '/comments/createCommentsThunk',
  async (data: Record<string, string | number | null>, thunkAPI) => {
    try {
      const response = await beInstance.post(COMMENTS_URL, {
        topicId: data.id,
        parentId: data.parentId,
        text: data.text,
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
        message: 'Не удалось создать комментарий',
      })
    }
  }
)

export default createCommentsThunk
