import { ChangeEvent } from 'react'
import { IPasswordData } from '../../../store/slices/user-slice/types'

export type ChangePasswordModalType = {
  isOpenModal: boolean
  handleSubmit: () => void
  password: IPasswordData
  handleChangePassword: (e: ChangeEvent<HTMLInputElement>) => void
  error: string | null
  hanldeCloseModal: () => void
}
