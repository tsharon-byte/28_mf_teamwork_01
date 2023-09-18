import { ChangeEvent, FormEvent, KeyboardEventHandler } from 'react'
import { Nullable } from '../../../types'

export type TopicTextFieldType = {
  message: string
  label?: string
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleAddComment: (e: FormEvent<HTMLFormElement | HTMLDivElement>) => void
  handleKeyDown: KeyboardEventHandler
  avatar: Nullable<string>
  placeholder?: string
}
