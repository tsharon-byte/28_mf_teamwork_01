import { axiosInstance } from '../../../../../utils/http-transport'
import { RETRIEVE_USER_URL } from '../../../../../constants/urls'
import { IUser } from '../../types'
import { createAsyncThunk } from '@reduxjs/toolkit'

const retrieveUserThunk = createAsyncThunk(
  '/user/retrieveUserThunk',
  (_, thunkAPI) =>
    axiosInstance
      .get<IUser>(RETRIEVE_USER_URL)
      .then(respose => respose.data)
      .catch(() => thunkAPI.rejectWithValue('Не удалось получить пользователя'))
)

export default retrieveUserThunk
