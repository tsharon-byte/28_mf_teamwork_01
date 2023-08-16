import { ReactNode } from 'react'
import { IUser } from '../../../store/slices/user-slice/types'
import { Nullable } from '../../../types'

export type TopicCommentListType = {
  comments: CommentType[]
  header: ReactNode
  footer: ReactNode
  user: Nullable<IUser>
  title: string
}

export type CommentType = {
  id: string
  text: string
  author: string
  date: string
  avatar: string
}
