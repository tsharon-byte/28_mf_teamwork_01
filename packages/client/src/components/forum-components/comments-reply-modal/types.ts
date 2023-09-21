import { ChangeEvent, FormEvent } from 'react'
import { Nullable } from '../../../types'

export type TCommentsReplyModal = {
  isOpenModal: boolean
  handleCloseModal: () => void
  handleSendReply: (e: FormEvent<HTMLFormElement>) => void
  handleCancel: () => void
  handleChangeMessage: (e: ChangeEvent<HTMLInputElement>) => void
  error: Nullable<string | undefined>
}
