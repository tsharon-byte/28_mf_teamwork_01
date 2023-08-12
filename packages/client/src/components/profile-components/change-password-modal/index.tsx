import { Modal, Box, Typography, Button } from '@mui/material'
import React, { memo, FC, useRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { passwordValidationRule } from '../../../validation-rules'
import { ChangePasswordModalType } from './types'
import styles from './styles.module.css'
import TextField from '../../text-field'
import Form from '../../form'

export const ChangePasswordModal: FC<ChangePasswordModalType> = memo(
  ({
    isOpenModal = false,
    handleSubmit,
    password,
    handleChangePassword,
    error,
    handleCloseModal,
  }) => {
    const formRef = useRef<HTMLFormElement>(null)
    return (
      <Modal open={isOpenModal} onClose={handleCloseModal}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Box className={styles.box}>
            <Typography variant="h5">Изменение пароля</Typography>
            <CloseIcon onClick={handleCloseModal} className={styles.close} />
          </Box>
          <TextField
            className={styles.field}
            label="Старый пароль"
            name="oldPassword"
            value={password.oldPassword}
            onChange={handleChangePassword}
            type="password"
            validationRules={[passwordValidationRule]}
            required
          />
          <TextField
            className={styles.field}
            label="Новый пароль"
            name="newPassword"
            value={password.newPassword}
            onChange={handleChangePassword}
            type="password"
            validationRules={[passwordValidationRule]}
            required
          />
          <Typography variant="body1" color="error">
            {error?.message}
          </Typography>
          <Box className={styles.box}>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              className={styles.button}
              onClick={handleCloseModal}>
              Отмена
            </Button>
            <Button variant="contained" type="submit" className={styles.button}>
              Изменить пароль
            </Button>
          </Box>
        </Form>
      </Modal>
    )
  }
)
