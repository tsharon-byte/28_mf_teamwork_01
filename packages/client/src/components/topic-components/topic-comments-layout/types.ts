import { ReactNode } from 'react'

export type TopicCommentsLayoutType = {
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
