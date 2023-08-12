import { ChangeEvent, FormEvent } from 'react'
import { Nullable } from '../../../types'

export type CreateTopicModalType = {
  isOpenModal: boolean
  handleCloseModal: () => void
  handleCreateChatSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleCancel: () => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  error: Nullable<string>
}
