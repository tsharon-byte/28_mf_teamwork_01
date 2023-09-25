import { ReactNode } from 'react'
import { TComments } from '../../../store/slices/comments-slice/types'
import { ThemeType } from '../../../store/slices/user-slice/types'

export type TopicCommentListType = {
  comments: TComments
  header: ReactNode
  footer: ReactNode
  title: string
  description: string | null
  authorId: number
  theme: ThemeType
  toggleTheme: () => void
}
