import { beInstance } from '../../../../../utils/http-transport'
import { COMMENTS_URL } from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { prepareError } from '../../../../../helpers'

const createCommentsThunk = createAsyncThunk(
  '/comments/createCommentsThunk',
  async (data: Record<string, string | number | null>, { rejectWithValue }) => {
    try {
      const response = await beInstance.post(COMMENTS_URL, {
        topicId: data.id,
        parentId: data.parentId,
        text: data.text,
      })
      return response.data
    } catch (error) {
      return rejectWithValue(prepareError(error))
    }
  }
)

export default createCommentsThunk
