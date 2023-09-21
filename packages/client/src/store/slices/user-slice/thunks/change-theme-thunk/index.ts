import { beInstance } from '../../../../../utils/http-transport'
import { APP_THEME_URL } from '../../../../../constants/urls'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThemeType } from '../../types'

const changeThemeThunk = createAsyncThunk(
  '/theme/changeThemeThunk',
  async ({ theme, userId }: { theme: ThemeType; userId: number }, thunkAPI) => {
    try {
      const response = await beInstance.post(APP_THEME_URL, { theme, userId })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось изменить тему')
    }
  }
)

export default changeThemeThunk
