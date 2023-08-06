import { IUser } from '../../store/slices/user-slice/types'

export type ProfileInfoType = {
  user: IUser
  handleOpenModal: () => void
}
