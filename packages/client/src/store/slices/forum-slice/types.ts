import { Nullable } from '../../../types'
import IError from '../../../helpers/prepare-error/types'

export type ForumInitialState = {
  chats: TChatList
  loading: boolean
  error: Nullable<IError>
  currentChat: Nullable<TChatItem>
}

export type TChatItem = {
  id: number
  authorId: number
  description?: string
  name: string
  createdAt: string
}

export type TChatList = {
  count: number
  rows: Array<TChatItem>
}
