import { createAsyncThunk } from '@reduxjs/toolkit'
import { beInstance } from '../../../../../utils/http-transport'
import { SELF_USER_URL } from '../../../../../constants/urls'
import { IUserData } from 'server/api/v1/types/user'
import { isAxiosError } from 'axios'

const saveUserThunk = createAsyncThunk(
  '/user/saveUserThunk',
  async (data: IUserData, thunkAPI) => {
    try {
      const response = await beInstance.post<IUserData>(SELF_USER_URL, {
        yandexId: data.yandexId,
        avatar: data.avatar,
        name: data.name,
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
        message: 'Не удалось сохранить пользователя в БД',
      })
    }
  }
)

export default saveUserThunk
