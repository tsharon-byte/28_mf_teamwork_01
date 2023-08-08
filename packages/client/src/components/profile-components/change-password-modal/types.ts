import { ChangeEvent } from 'react'
import { IPasswordData } from '../../../store/slices/user-slice/types'
import { Nullable } from '../../../types'

export type ChangePasswordModalType = {
  isOpenModal?: boolean
  handleSubmit: () => void
  password: IPasswordData
  handleChangePassword: (e: ChangeEvent<HTMLInputElement>) => void
  error: Nullable<string>
  hanldeCloseModal: () => void
}
