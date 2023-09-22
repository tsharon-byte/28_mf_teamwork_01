import { beInstance } from '../../../../../utils/http-transport'
import { APP_THEME_URL } from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Nullable } from '../../../../../types'
const retrieveThemeThunk = createAsyncThunk(
  '/theme/retrieveThemeThunk',
  async (userId: Nullable<number>, thunkAPI) => {
    try {
      const response = await beInstance.get(`${APP_THEME_URL}${userId}`)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось получить тему')
    }
  }
)

export default retrieveThemeThunk
