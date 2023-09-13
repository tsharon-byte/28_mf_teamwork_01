import { Nullable } from '../../../types'
import IError from '../../../helpers/prepare-error/types'

export type EmojiInitialState = {
  emojies: EmojiType[] | []
  loading: boolean
  error: Nullable<IError>
}

export type EmojiType = {
  id: number
  name: string
  code: string
}
