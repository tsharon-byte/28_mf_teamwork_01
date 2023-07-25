import { API_URL } from './constants'
import { LoginData, RegistrationData } from './type'

const checkResponse = (res: Response) => {
  return res.ok ? res : res.json().then((err: string) => Promise.reject(err))
}

const request = (
  url: RequestInfo | URL,
  option: RequestInit = {}
): Promise<Response> => {
  return fetch(url, option).then(res => checkResponse(res))
}

const postRequest = (endPoint: string, options: RequestInit = {}) => {
  const option = {
    ...options,
    method: 'POST',
    credentials: 'include' as RequestCredentials,
  }

  return request(`${API_URL}/${endPoint}`, option)
}

const getRequest = (endPoint: string, options: RequestInit = {}) => {
  const option = {
    ...options,
    method: 'GET',
    credentials: 'include' as RequestCredentials,
  }

  return request(`${API_URL}/${endPoint}`, option)
}

export const registration = (data: RegistrationData) => {
  const body = JSON.stringify(data)
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  } as RequestInit

  return postRequest('auth/signup', options)
}

export const login = (data: LoginData) => {
  const body = JSON.stringify(data)

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  } as RequestInit

  return postRequest('auth/signin', options)
}

export const logout = () => {
  return postRequest('auth/logout')
}

export const getUser = () => {
  return getRequest('auth/user')
}
