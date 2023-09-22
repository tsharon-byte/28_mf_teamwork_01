import { ReactNode } from 'react'
import { IUser } from '../../../store/slices/user-slice/types'
import { Nullable } from '../../../types'
import { TComments } from '../../../store/slices/comments-slice/types'

export type TopicCommentListType = {
  comments: TComments
  header: ReactNode
  footer: ReactNode
  user: Nullable<IUser>
  title: string
}
