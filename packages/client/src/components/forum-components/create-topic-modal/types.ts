import { ChangeEvent, FormEvent } from 'react'
import { Nullable } from '../../../types'

export type CreateTopicModalType = {
  isOpenModal: boolean
  handleCloseModal: () => void
  handleCreateChatSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleCancel: () => void
  handleChangeChatName: (e: ChangeEvent<HTMLInputElement>) => void
  handleChangeChatDescription: (e: ChangeEvent<HTMLInputElement>) => void
  error: Nullable<string | undefined>
}
