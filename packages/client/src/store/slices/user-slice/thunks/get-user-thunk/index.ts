import { axiosInstance } from '../../../../../utils/http-transport'
import { GET_USER_URL } from '../../../../../constants/urls'
import { IUser } from '../../types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'

const getUserThunk = createAsyncThunk(
  '/user/getUserThunk',
  async (id: number, thunkAPI) => {
    try {
      const response = await axiosInstance.get<IUser>(`${GET_USER_URL}${id}`)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        return thunkAPI.rejectWithValue({
          status: error.response?.status,
          message: error.response?.data?.reason,
        })
      }
      return thunkAPI.rejectWithValue({
        message: 'Не удалось получить пользователя',
      })
    }
  }
)

export default getUserThunk
