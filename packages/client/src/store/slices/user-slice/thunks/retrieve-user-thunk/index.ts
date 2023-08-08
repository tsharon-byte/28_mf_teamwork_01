import { axiosInstance } from '../../../../../utils/http-transport'
import { RETRIEVE_USER_URL } from '../../../../../constants/urls'
import { IUser } from '../../types'
import { createAsyncThunk } from '@reduxjs/toolkit'

const retrieveUserThunk = createAsyncThunk(
  '/user/retrieveUserThunk',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get<IUser>(RETRIEVE_USER_URL)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Не удалось получить пользователя')
    }
  }
)

export default retrieveUserThunk
