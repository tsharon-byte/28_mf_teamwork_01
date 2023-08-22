import { IUser } from '../../../user-slice/types'
import { IUserScore } from '../../types'
import { RATING_FIELD_NAME } from '../constants'

export interface ILeaderboardRecord {
  data: {
    user: IUser
    [RATING_FIELD_NAME]: number
  }
}

export interface IRetrieveLeaderboardFulfilledPayload {
  cursor: number
  results: IUserScore[]
}
