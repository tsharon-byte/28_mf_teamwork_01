import { Nullable } from '../../../types'
import IError from '../../../helpers/prepare-error/types'

export type TCommentsInitialState = {
  comments: TComments
  loading: boolean
  error: Nullable<IError>
}

export type TComment = {
  id: number
  topicId: number
  parentId: number
  authorId: number
  text: string
  createdAt: string
}

export type TComments = {
  count: number
  rows: Array<TComment>
}
