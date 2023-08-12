import { ChangeEvent, FormEvent } from 'react'
import { IError, IPasswordData } from '../../../store/slices/user-slice/types'
import { Nullable } from '../../../types'

export type ChangePasswordModalType = {
  isOpenModal?: boolean
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  password: IPasswordData
  handleChangePassword: (e: ChangeEvent<HTMLInputElement>) => void
  error: Nullable<IError>
  handleCloseModal: () => void
}
