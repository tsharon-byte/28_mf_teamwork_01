import { TLoginData, TRegistrationData } from './type'
import { axiosInstance } from '../../utils/http-transport'
import { AxiosResponse } from 'axios'

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
