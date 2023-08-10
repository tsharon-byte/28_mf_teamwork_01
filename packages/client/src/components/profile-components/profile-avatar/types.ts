import { ChangeEvent } from 'react'
import { IUser } from '../../../store/slices/user-slice/types'

export type ProfileAvatarType = {
  handleUploadFile: () => void
  handleChangeAvatar: (e: ChangeEvent<HTMLInputElement>) => void
  user: IUser
  ref: React.ForwardedRef<HTMLInputElement>
}
