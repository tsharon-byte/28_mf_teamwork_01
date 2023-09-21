import { IUser } from '../../types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { isAxiosError } from 'axios'
import { axiosInstance } from '../../../../../utils/http-transport'
import { RETRIEVE_USER_URL } from '../../../../../constants/urls'

const retrieveUserThunk = createAsyncThunk(
  '/user/retrieveUserThunk',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get<IUser>(RETRIEVE_USER_URL)
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

export default retrieveUserThunk
