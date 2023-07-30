import { TLoginData, TRegistrationData } from './type'
import { axiosInstance } from '../../utils/http-transport'

export const registration = async (data: TRegistrationData) => {
  return axiosInstance.post('auth/signup', data)
}

export const login = async (data: TLoginData) => {
  return axiosInstance.post('auth/signin', data)
}

export const logout = async () => {
  return axiosInstance.post('auth/logout')
}

export const getUser = async () => {
  return axiosInstance.get('auth/user')
}
