import { TLoginData, TRegistrationData } from './type'
import { AxiosRequestConfig } from 'axios'
import { getRequest, postRequest } from '../../utils/api'

export const registration = (data: TRegistrationData) => {
  const options = {
    data,
  } as AxiosRequestConfig

  return postRequest('auth/signup', options)
}

export const login = (data: TLoginData) => {
  const options = {
    data,
  } as AxiosRequestConfig

  return postRequest('auth/signin', options)
}

export const logout = () => {
  return postRequest('auth/logout')
}

export const getUser = () => {
  return getRequest('auth/user')
}
