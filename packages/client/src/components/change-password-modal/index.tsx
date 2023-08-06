import { Modal, Box, Typography, Button } from '@mui/material'
import React, { memo, FC } from 'react'
import { Form } from 'react-router-dom'
import { passwordValidationRule } from '../../validation-rules'
import { ChangePasswordModalType } from './types'
import styles from './styles.module.css'
import TextField from '../text-field'

export const ChangePasswordModal: FC<ChangePasswordModalType> = memo(props => {
  const {
    isOpenModal,
    handleSubmit,
    password,
    handleChangePassword,
    error,
    hanldeCloseModal,
  } = props

  return (
    <Modal open={isOpenModal} onClose={hanldeCloseModal}>
      <Box className={styles.modal__box}>
        <Form onSubmit={handleSubmit}>
          <TextField
            sx={{ minWidth: 500 }}
            label="Старый пароль"
            name="oldPassword"
            value={password.oldPassword}
            onChange={handleChangePassword}
            type="password"
            validationRules={[passwordValidationRule]}
            required
          />
          <TextField
            sx={{ minWidth: 500 }}
            label="Новый пароль"
            name="newPassword"
            value={password.newPassword}
            onChange={handleChangePassword}
            type="password"
            validationRules={[passwordValidationRule]}
            required
          />
          <Typography variant="body1" sx={{ color: '#b71c1c' }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            type="submit"
            sx={{ minWidth: 300, margin: '0 auto' }}>
            Изменить пароль
          </Button>
          <Button
            sx={{ minWidth: 300, margin: '0 auto' }}
            variant="contained"
            type="button"
            onClick={hanldeCloseModal}>
            Отмена
          </Button>
        </Form>
      </Box>
    </Modal>
  )
})
