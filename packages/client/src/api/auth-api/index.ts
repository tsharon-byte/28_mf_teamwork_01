import { TLoginData, TRegistrationData } from './type'
import { axiosInstance, beInstance } from '../../utils/http-transport'
import { AxiosResponse } from 'axios'
import { SELF_USER_URL } from '../../constants/urls'

export const registration = (
  data: TRegistrationData
): Promise<AxiosResponse> => {
  return axiosInstance.post('auth/signup', data)
}

export const login = (data: TLoginData): Promise<AxiosResponse> => {
  return axiosInstance.post('auth/signin', data)
}

export const logout = (): Promise<AxiosResponse> => {
  return axiosInstance.post('auth/logout')
}

export const getUser = (): Promise<AxiosResponse> => {
  return axiosInstance.get('auth/user')
}

export const saveUserInBD = async (): Promise<AxiosResponse> => {
  const user = await getUser()

  return await beInstance.post(SELF_USER_URL, {
    yandexId: user.data.id,
    name: user.data.first_name,
    avatar: user.data?.avatar,
  })
}

export const saveScore = async (score: number): Promise<AxiosResponse> => {
  const user = await getUser()

  return await beInstance.put(`${SELF_USER_URL}${user.data.id}`, {
    score,
  })
}
