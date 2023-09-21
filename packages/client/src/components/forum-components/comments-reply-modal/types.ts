import { ChangeEvent, FormEvent } from 'react'

export type TCommentsReplyModal = {
  isOpenModal: boolean
  handleCloseModal: () => void
  handleSendReply: (e: FormEvent<HTMLFormElement>) => void
  handleCancel: () => void
  handleChangeMessage: (e: ChangeEvent<HTMLInputElement>) => void
}
