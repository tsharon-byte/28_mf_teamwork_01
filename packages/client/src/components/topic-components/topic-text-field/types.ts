import { ChangeEvent, KeyboardEventHandler } from 'react'

export type TopicTextFieldType = {
  message: string
  label?: string
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleAddComment: () => void
  handleKeyDown: KeyboardEventHandler
}
