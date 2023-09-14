import * as express from 'express'

type Nullable<T> = T | null

interface IUser {
  id: number
  first_name: string
  second_name: string
  display_name: Nullable<string>
  login: string
  avatar: Nullable<string>
  email: string
  phone: string
}

declare global {
  namespace Express {
    export interface Request {
      user?: IUser
    }
  }
}
