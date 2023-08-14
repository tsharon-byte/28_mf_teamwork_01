import { ReactNode } from 'react'

export type TopicCommentListType = {
  comments: CommentType[]
  header: ReactNode
  footer: ReactNode
}

export type CommentType = {
  id: string
  text: string
  author: string
  date: string
}
