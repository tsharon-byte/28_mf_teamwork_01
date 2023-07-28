import { IUser } from '../../types'
import { IUserScore } from './types'

const users: IUser[] = [
  {
    id: 1,
    display_name: 's1mple',
  },
  {
    id: 2,
    display_name: 'b1t',
  },
  {
    id: 3,
    display_name: 'perfecto',
  },
  {
    id: 4,
    display_name: 'electonic',
  },
  {
    id: 5,
    display_name: 'boombl4',
  },
  {
    id: 6,
    display_name: 'NiKo',
  },
  {
    id: 7,
    display_name: 'huNter',
  },
  {
    id: 8,
    display_name: 'jks',
  },
  {
    id: 9,
    display_name: 'HooXi',
  },
  {
    id: 10,
    display_name: 'm0NESY',
  },
  {
    id: 11,
    display_name: 'Aleksib',
  },
  {
    id: 12,
    display_name: 'iM',
  },
  {
    id: 13,
    display_name: 'iL',
  },
]

const minScore = 0
const maxScore = 10000

export const userScores: IUserScore[] = users
  .map(user => ({
    user,
    score: Math.floor(Math.random() * maxScore) + minScore,
  }))
  .sort((lhs, rhs) => rhs.score - lhs.score)

export const currentUser = users[0]
