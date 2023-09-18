import { beInstance } from '../../../../../utils/http-transport'
import { APP_THEME_URL } from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'

const retrieveThemeThunk = createAsyncThunk(
  '/theme/retrieveThemeThunk',
  async (_, thunkAPI) => {
    try {
      const response = await beInstance.get(APP_THEME_URL)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось получить тему')
    }
  }
)

export default retrieveThemeThunk
