import { ReactNode } from 'react'

export type TopicCommentsLayoutType = {
  comments: { id: string; text: string }[]
  header: ReactNode
  footer: ReactNode
}
