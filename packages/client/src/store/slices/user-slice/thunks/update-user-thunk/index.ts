import { IUser } from '../../types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../../../../utils/http-transport'
import { UPDATE_USER_URL } from '../../../../../constants/urls'
import { ThunkApiConfig } from '../../../types'
import { prepareError } from '../../../../../helpers'

const updateUserThunk = createAsyncThunk<
IUser | undefined,
Partial<IUser>,
ThunkApiConfig
>(
    '/user/updateUserThunk',
    async (data, { getState, rejectWithValue }) => {
        const { user } = getState().user
        try {
            const response = await axiosInstance.put<IUser>(
                UPDATE_USER_URL,
                { ...user, ...data }
            )
            return response.data
        } catch (error) {
            return rejectWithValue(prepareError(error))
        }
    }
)

export default updateUserThunk
