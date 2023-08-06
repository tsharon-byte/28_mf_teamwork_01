import React, { memo, FC } from 'react'
import TextField from '../../text-field'
import { Button, InputAdornment, Typography } from '@mui/material'
import { StyledEditIcon } from '../styled-edit-icon'
import { ProfileInfoType } from './types'
import styles from './styles.module.css'

export const ProfileInfo: FC<ProfileInfoType> = memo(props => {
  const { user, handleOpenModal } = props
  return (
    <>
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
      <div className={styles.wrapper}>
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
          onClick={handleOpenModal}
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
    </>
  )
})
