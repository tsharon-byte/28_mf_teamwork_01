import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
})

export const beInstance = axios.create({
  baseURL: API_SERVER_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
})
