import { IUser } from '../../store/slices/user-slice/types'

export interface IUserScore {
  user: IUser
  score: number
}
