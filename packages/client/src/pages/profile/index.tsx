import { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
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

const Profile: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { logout } = useAuth()
  const { user } = useUser()
  const { error } = useAppSelector(state => state.user, shallowEqual)
  const [isHoverAvatar, setIsHoverAvatar] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [password, setPassword] = useState({ oldPassword: '', newPassword: '' })
  const inputRef = useRef<HTMLInputElement>(null)

  const callbacks = {
    handleBackNavigate: useCallback(() => navigate(-1 || '/'), []),
    handleSubmit: useCallback(() => {
      dispatch(changePasswordThunk(password))
    }, [dispatch, password]),
    handleChangePassword: useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const name = e.target.name
        setPassword(prevState => ({ ...prevState, [name]: value }))
      },
      [setPassword]
    ),
    handleOpenModal: useCallback(() => setIsOpenModal(true), []),
    hanldeCloseModal: useCallback(() => setIsOpenModal(false), []),
    handleMouseEnterAvatar: useCallback(() => setIsHoverAvatar(true), []),
    handleMouseLeaveAvatar: useCallback(() => setIsHoverAvatar(false), []),
    handleUploadFile: useCallback(() => {
      if (inputRef.current) {
        inputRef.current.click()
      }
    }, []),
    handleChangeAvatar: useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const target = e.currentTarget
      if (target.files === null) {
        return
      }
      const formData = new FormData()
      formData.append('avatar', target.files[0])

      dispatch(changeAvatarThunk(formData))
    }, []),
  }

  if (!user) {
    return null
  }

  return (
    <ContentLayout
      navigation={false}
      header={<ProfileHeader callback={callbacks.handleBackNavigate} />}>
      <ProfileAvatar
        handleMouseEnterAvatar={callbacks.handleMouseEnterAvatar}
        handleMouseLeaveAvatar={callbacks.handleMouseLeaveAvatar}
        handleUploadFile={callbacks.handleUploadFile}
        handleChangeAvatar={callbacks.handleChangeAvatar}
        isHoverAvatar={isHoverAvatar}
        ref={inputRef}
        user={user}
      />
      <ProfileInfo user={user} handleOpenModal={callbacks.handleOpenModal} />
      <Button variant="contained" onClick={logout} sx={{ minWidth: 300 }}>
        Выйти
      </Button>
      <ChangePasswordModal
        isOpenModal={isOpenModal}
        handleSubmit={callbacks.handleSubmit}
        password={password}
        handleChangePassword={callbacks.handleChangePassword}
        error={error}
        hanldeCloseModal={callbacks.hanldeCloseModal}
      />
    </ContentLayout>
  )
}

export default Profile
