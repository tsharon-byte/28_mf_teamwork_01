import { IUser } from '../../types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { isAxiosError } from 'axios'
import { API_ROOT } from '../../../../../hooks/use-oauth/constants'

const retrieveUserThunk = createAsyncThunk(
  '/user/retrieveUserThunk',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser>(`${API_ROOT}/auth/user`, {
        withCredentials: true,
      })
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
