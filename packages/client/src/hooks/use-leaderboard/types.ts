import { IUser } from '../../store/slices/user-slice/types'
import { RATING_FIELD_NAME } from './constants'

export interface ILeaderboardRecord {
  data: {
    user: IUser
    [RATING_FIELD_NAME]: number
  }
}

export interface IUserScore {
  user: IUser
  score: number
}
