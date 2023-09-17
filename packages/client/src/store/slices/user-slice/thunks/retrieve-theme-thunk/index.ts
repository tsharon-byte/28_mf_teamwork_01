import { axiosInstance } from '../../../../../utils/http-transport'
import { APP_THEME_URL} from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'

const retrieveThemeThunk = createAsyncThunk(
  '/user/retrieveThemeThunk',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(APP_THEME_URL)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось получить тему',)
    }
  }
)

export default retrieveThemeThunk
