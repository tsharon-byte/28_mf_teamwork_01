import { ChangeEvent, FC, useCallback, useRef, useState } from 'react'
import { Box, Button, InputAdornment, Modal, Typography } from '@mui/material'
import { ContentLayout } from '../../layouts'
import { Avatar } from '@mui/material'
import { useAuth, useUser } from '../../hooks'
import { makeResourcePath } from '../../helpers'
import styles from './styles.module.css'
import { Form, TextField } from '../../components'
import { StyledEditIcon } from '../../components/styled-edit-icon'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  changeAvatarThunk,
  changePasswordThunk,
} from '../../store/slices/user-slice/thunks'
import passwordValidationRule from '../../validation-rules/password-validation-rule'
import loginValidator from '../../validators/login-validator'
import { shallowEqual } from 'react-redux'

const Profile: FC = () => {
  const { logout } = useAuth()
  const { user } = useUser()
  const dispatch = useAppDispatch()
  const { error } = useAppSelector(state => state.user, shallowEqual)
  const [isHoverAvatar, setIsHoverAvatar] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [password, setPassword] = useState({ oldPassword: '', newPassword: '' })

  const callbacks = {
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
    handleUploadIconClick: useCallback(() => {
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
    <ContentLayout navigation={false}>
      <div
        onMouseEnter={callbacks.handleMouseEnterAvatar}
        onMouseLeave={callbacks.handleMouseLeaveAvatar}
        style={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {isHoverAvatar && (
          <>
            <FileUploadIcon
              onClick={callbacks.handleUploadIconClick}
              sx={{
                cursor: 'pointer',
                ':hover': { color: '#FCD448' },
              }}
            />
            <input
              type="file"
              accept="image/*"
              style={{ visibility: 'hidden', width: 0, height: 0 }}
              ref={inputRef}
              onChange={callbacks.handleChangeAvatar}
            />
          </>
        )}
        <Avatar
          sx={{
            width: 150,
            height: 150,
            bgcolor: '#FFFFFF',
            ':hover': { bgcolor: '#FCD448' },
          }}
          sizes="md"
          alt={user.first_name}
          src={user.avatar && makeResourcePath(user.avatar)}></Avatar>
        {isHoverAvatar && (
          <DeleteOutlineIcon
            sx={{
              cursor: 'pointer',
              ':hover': { color: '#FCD448' },
            }}
          />
        )}
      </div>

      <TextField
        sx={{ minWidth: 550 }}
        name="login"
        value={user.login}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" style={{ color: '#FFFFFF' }}>
              <StyledEditIcon mainColor="#FFFFFF" hoverColor="#FFD54F" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        sx={{ minWidth: 550 }}
        name="email"
        value={user.email}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" style={{ color: '#FFFFFF' }}>
              <StyledEditIcon mainColor="#FFFFFF" hoverColor="#FFD54F" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        sx={{ minWidth: 550 }}
        name="display_name"
        value={user.display_name || ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" style={{ color: '#FFFFFF' }}>
              <StyledEditIcon mainColor="#FFFFFF" hoverColor="#FFD54F" />
            </InputAdornment>
          ),
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="body1"
          sx={{
            fontSize: 16,
            lineHeight: '20px',
            color: '#FFFFFF',
            opacity: 0.5,
          }}>
          Надоел пароль?
        </Typography>
        <Button
          onClick={callbacks.handleOpenModal}
          variant="text"
          sx={{
            fontSize: 16,
            lineHeight: '20px',
            color: '#FFFFFF',
            textTransform: 'none',
          }}>
          Изменить
        </Button>
      </div>
      <Button variant="contained" onClick={logout} sx={{ minWidth: 300 }}>
        Выйти
      </Button>
      <Modal open={isOpenModal} onClose={callbacks.hanldeCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            bgcolor: '#171813',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #FFFFFF',
            borderRadius: 8,
            minHeight: 320,
            minWidth: 320,
            padding: 8,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
          <Form onSubmit={callbacks.handleSubmit}>
            <TextField
              sx={{ minWidth: 280 }}
              label="Старый пароль"
              name="oldPassword"
              value={password.oldPassword}
              onChange={callbacks.handleChangePassword}
              type="password"
              validationRules={[passwordValidationRule]}
              required
            />
            <TextField
              sx={{ minWidth: 280 }}
              label="Новый пароль"
              name="newPassword"
              value={password.newPassword}
              onChange={callbacks.handleChangePassword}
              type="password"
              validationRules={[passwordValidationRule]}
              required
            />
            <Typography variant="body1" sx={{ color: '#b71c1c' }}>
              {error}
            </Typography>
            <Button variant="contained" type="submit">
              Изменить пароль
            </Button>
            <Button
              variant="contained"
              type="button"
              onClick={callbacks.hanldeCloseModal}>
              Отмена
            </Button>
          </Form>
        </Box>
      </Modal>
    </ContentLayout>
  )
}

export default Profile
