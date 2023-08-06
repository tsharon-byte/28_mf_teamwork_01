import { axiosInstance } from '../../../../../utils/http-transport'
import { CHANGE_PASSWORD_URL } from '../../../../../constants/urls'

import { createAsyncThunk } from '@reduxjs/toolkit'

const changePasswordThunk = createAsyncThunk(
  '/user/changePasswordThunk',
  async (
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.put(CHANGE_PASSWORD_URL, {
        oldPassword,
        newPassword,
      })
      return response.data
    } catch (error) {
      const errorMessage =
        (error as { response?: { data?: { reason?: string } } })?.response?.data
          ?.reason || 'Не удалось изменить пароль'
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)

export default changePasswordThunk
