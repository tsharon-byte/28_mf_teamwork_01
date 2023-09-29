import { ChangeEvent, FormEvent } from 'react'

export type CreateTopicModalType = {
  isOpenModal: boolean
  handleCloseModal: () => void
  handleCreateChatSubmit: (e: FormEvent<HTMLFormElement>) => void
  handleCancel: () => void
  handleChangeChatName: (e: ChangeEvent<HTMLInputElement>) => void
  handleChangeChatDescription: (e: ChangeEvent<HTMLInputElement>) => void
}
