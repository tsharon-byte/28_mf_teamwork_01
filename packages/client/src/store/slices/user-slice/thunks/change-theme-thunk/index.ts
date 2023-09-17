import { beInstance } from '../../../../../utils/http-transport'
import { APP_THEME_URL } from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'

const changeThemeThunk = createAsyncThunk(
  '/user/changeThemeThunk',
  async (mode: 'dark' | 'light', thunkAPI) => {
    try {
      const response = await beInstance.post(APP_THEME_URL, { mode })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось изменить тему')
    }
  }
)

export default changeThemeThunk
