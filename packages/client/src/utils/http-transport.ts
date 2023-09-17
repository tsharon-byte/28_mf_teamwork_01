import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const BE_URL = '/api'

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export const beInstance = axios.create({
  baseURL: BE_URL,
  withCredentials: false,
})
