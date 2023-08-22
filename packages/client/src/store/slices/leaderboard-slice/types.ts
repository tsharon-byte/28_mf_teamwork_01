import { IUser } from '../../slices/user-slice/types'
import { Nullable } from '../../../types'
import IError from '../../../helpers/prepare-error/types'

export interface IUserScore {
  user: IUser
  score: number
}

export interface ILeaderboardState {
  loading: boolean
  leaderboard: IUserScore[]
  error: Nullable<IError>
  cursor: number
  hasMore: boolean
}
