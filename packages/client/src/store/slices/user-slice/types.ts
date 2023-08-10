import { Nullable } from '../../../types'

export interface IUser {
  id: number
  first_name?: string
  second_name?: string
  display_name: string
  login?: string
  email?: string
  phone?: string
  avatar?: string
}

export interface IUserState {
  loading: boolean
  user: Nullable<IUser>
  error: Nullable<IError>
}

export interface IError {
  status: number
  message: string
}
