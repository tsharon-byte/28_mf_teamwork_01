import { ReactNode } from 'react'
import { IUser, Mode } from '../../../store/slices/user-slice/types'
import { Nullable } from '../../../types'

export type TopicCommentListType = {
  comments: CommentType[]
  header: ReactNode
  footer: ReactNode
  user: Nullable<IUser>
  title: string
  mode: Mode
  toggleTheme: () => void
}

export type CommentType = {
  id: string
  text: string
  author: string
  date: string
  avatar: string
}
