import { ChangeEvent } from 'react'
import { IUser } from '../../store/slices/user-slice/types'

export type ProfileAvatarType = {
  handleMouseEnterAvatar: () => void
  handleMouseLeaveAvatar: () => void
  handleUploadFile: () => void
  handleChangeAvatar: (e: ChangeEvent<HTMLInputElement>) => void
  isHoverAvatar: boolean
  user: IUser
  ref: React.ForwardedRef<HTMLInputElement>
}
