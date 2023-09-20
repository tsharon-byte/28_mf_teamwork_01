import { Nullable } from '../../../types'
import IError from '../../../helpers/prepare-error/types'

export interface IUser {
  id: number
  first_name?: string
  second_name?: string
  display_name: string | null
  login?: string
  email?: string
  phone?: string
  avatar?: string
  status?: string | null
}

export interface IUserState {
  loading: boolean
  user: Nullable<IUser>
  error: Nullable<IError>
  mode: Mode
}

export interface IPasswordData {
  oldPassword: string
  newPassword: string
}

export interface IErrorChangePassword {
  response: { data: { reason: string } }
}

export interface IUserUpdateData {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export type Mode = 'dark' | 'light'
