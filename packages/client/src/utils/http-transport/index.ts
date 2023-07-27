import { API_URL } from '../constants'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const request = (
  endPoint: string,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  return axios({
    ...config,
    withCredentials: true,
    url: `${API_URL}/${endPoint}`,
  }).then(res => res)
}
export const postRequest = (
  endPoint: string,
  options: AxiosRequestConfig = {}
) => {
  const config = {
    ...options,
    method: 'POST',
  } as AxiosRequestConfig

  return request(endPoint, config)
}
export const getRequest = (
  endPoint: string,
  options: AxiosRequestConfig = {}
) => {
  const config = {
    ...options,
    method: 'GET',
  } as AxiosRequestConfig

  return request(endPoint, config)
}
export const putRequest = (
  endPoint: string,
  options: AxiosRequestConfig = {}
) => {
  const config = {
    ...options,
    method: 'PUT',
  } as AxiosRequestConfig

  return request(endPoint, config)
}
export const deleteRequest = (
  endPoint: string,
  options: AxiosRequestConfig = {}
) => {
  const config = {
    ...options,
    method: 'DELETE',
  } as AxiosRequestConfig

  return request(endPoint, config)
}
