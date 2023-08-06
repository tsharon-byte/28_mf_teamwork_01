import { axiosInstance } from '../../../../../utils/http-transport'
import { CHANGE_AVATAR_URL } from '../../../../../constants/urls'

import { createAsyncThunk } from '@reduxjs/toolkit'

const changeAvatarThunk = createAsyncThunk(
  '/user/changeAvatarThunk',
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axiosInstance.put(CHANGE_AVATAR_URL, formData)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось изменить аватар пользователя')
    }
  }
)

export default changeAvatarThunk
