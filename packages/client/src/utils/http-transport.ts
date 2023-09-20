import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL
const PROXY_API = import.meta.env.VITE_PROXY_URL

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export const beInstance = axios.create({
  baseURL: API_SERVER_URL,
  withCredentials: true,
})

export const axioxProxyInstance = axios.create({
  baseURL: PROXY_API,
  withCredentials: true,
})
