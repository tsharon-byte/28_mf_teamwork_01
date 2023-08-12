import { axiosInstance } from '../../../../../utils/http-transport'
import { CHANGE_PASSWORD_URL } from '../../../../../constants/urls'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { IErrorChangePassword, IPasswordData } from '../../types'

const changePasswordThunk = createAsyncThunk(
  '/user/changePasswordThunk',
  async ({ oldPassword, newPassword }: IPasswordData, thunkAPI) => {
    try {
      const response = await axiosInstance.put(CHANGE_PASSWORD_URL, {
        oldPassword,
        newPassword,
      })
      return response.data
    } catch (error) {
      const errorMessage = (error as IErrorChangePassword)?.response?.data
        ?.reason
      if (errorMessage === 'Password is incorrect') {
        return thunkAPI.rejectWithValue({
          status: 401,
          message: 'Введен неверный пароль',
        })
      } else {
        return thunkAPI.rejectWithValue({
          status: 500,
          message: 'Произошла ошибка',
        })
      }
    }
  }
)

export default changePasswordThunk
