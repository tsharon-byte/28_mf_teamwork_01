import { axiosInstance } from '../../../../../utils/http-transport'
import { CHANGE_AVATAR_URL } from '../../../../../constants/urls'
import { prepareError } from '../../../../../helpers'

import { createAsyncThunk } from '@reduxjs/toolkit'

const changeAvatarThunk = createAsyncThunk(
  '/user/changeAvatarThunk',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(CHANGE_AVATAR_URL, formData, {
        timeout: 1000,
        timeoutErrorMessage: 'File too large',
      })
      return response.data
    } catch (error) {
      return rejectWithValue(prepareError(error))
    }
  }
)

export default changeAvatarThunk
