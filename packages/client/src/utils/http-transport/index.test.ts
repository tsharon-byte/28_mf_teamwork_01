import axios, { AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { deleteRequest, getRequest, postRequest, putRequest } from './index'
import { API_URL } from '../constants'

const mock = new MockAdapter(axios)

describe('testing API', () => {
  it('should GET user', async () => {
    mock.onGet(`${API_URL}/users`).reply(200, {
      users: [{ id: 1, name: 'John Wick' }],
    })

    const result = await getRequest('users')

    expect(result.data.users[0].name).toEqual('John Wick')
  })

  it('post request should return status 200', async function () {
    mock.onPost(`${API_URL}/logout`).reply(200)

    const result = await postRequest('logout')

    expect(result.status).toEqual(200)
  })

  it('should return user', async () => {
    const user = {
      first_name: 'John',
      second_name: 'Wick',
      display_name: 'J.W.',
      login: 'Weak',
      email: 'DogBestFriend@gmail.com',
      phone: '79123456789',
    }

    mock.onPut(`${API_URL}/user/password`).reply(200, {
      user,
    })

    const options = {
      data: {
        first_name: 'John',
        second_name: 'Wick',
        display_name: 'J.W.',
        login: 'Weak',
        email: 'DogBestFriend@gmail.com',
        phone: '79123456789',
      },
    } as AxiosRequestConfig

    const result = await putRequest('user/password', options)

    expect(result.data.user).toEqual(user)
  })

  it('should delete user', async () => {
    mock.onDelete(`${API_URL}/user`).reply(200)

    const options = {
      data: {
        userId: 1,
      },
    }

    const result = await deleteRequest('user', options)

    expect(result.status).toEqual(200)
  })
})
