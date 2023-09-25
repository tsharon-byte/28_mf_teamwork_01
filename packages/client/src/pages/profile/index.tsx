import {
  ChangeEvent,
  FC,
  FormEvent,
  FormEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react'
import { Button } from '@mui/material'
import { ContentLayout } from '../../layouts'
import { useAuth, useUser } from '../../hooks'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  changeAvatarThunk,
  changePasswordThunk,
} from '../../store/slices/user-slice/thunks'
import { shallowEqual } from 'react-redux'
import { ProfileHeader } from '../../components/profile-components/profile-header'
import { useNavigate } from 'react-router-dom'
import { ProfileAvatar } from '../../components/profile-components/profile-avatar'
import { ChangePasswordModal } from '../../components/profile-components/change-password-modal'
import { ProfileInfo } from '../../components/profile-components/profile-info'
import { IUser } from '../../store/slices/user-slice/types'

const Profile: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { logout } = useAuth()
  const { user, updateUser } = useUser(true)
  const { error } = useAppSelector(state => state.user, shallowEqual)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [password, setPassword] = useState({ oldPassword: '', newPassword: '' })
  const inputRef = useRef<HTMLInputElement>(null)

  const handleBackNavigate = useCallback(() => navigate(-1 || '/'), [])
  const handleChangePasswordSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch(changePasswordThunk(password))
        .unwrap()
        .then(() => {
          setIsOpenModal(false)
        })
    },
    [dispatch, password]
  )

  const handleChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const name = e.target.name
      setPassword(prevState => ({ ...prevState, [name]: value }))
    },
    [setPassword]
  )
  const handleOpenModal = useCallback(() => setIsOpenModal(true), [])
  const handleCloseModal = useCallback(() => setIsOpenModal(false), [])
  const handleUploadFile = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }, [inputRef])
  const handleChangeAvatar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.currentTarget
      if (target.files === null) {
        return
      }
      const formData = new FormData()
      formData.append('avatar', target.files[0])

      dispatch(changeAvatarThunk(formData))
    },
    [dispatch]
  )

  if (!user) {
    return null
  }

  const handleUpdateUserSubmit: FormEventHandler<HTMLFormElement> = event => {
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries()) as Partial<IUser>
    updateUser(data)
  }

  return (
    <ContentLayout
      navigation={false}
      header={<ProfileHeader callback={handleBackNavigate} />}>
      <ProfileAvatar
        handleUploadFile={handleUploadFile}
        handleChangeAvatar={handleChangeAvatar}
        ref={inputRef}
        user={user}
      />
      <ProfileInfo
        user={user}
        handleOpenModal={handleOpenModal}
        handleUpdateUserSubmit={handleUpdateUserSubmit}
      />
      <Button variant="contained" onClick={logout} sx={{ minWidth: 300 }}>
        Выйти
      </Button>
      <ChangePasswordModal
        isOpenModal={isOpenModal}
        handleSubmit={handleChangePasswordSubmit}
        password={password}
        handleChangePassword={handleChangePassword}
        error={error}
        handleCloseModal={handleCloseModal}
      />
    </ContentLayout>
  )
}

export default Profile
