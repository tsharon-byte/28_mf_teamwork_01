import { Modal, Box, Typography, Button } from '@mui/material'
import React, { memo, FC } from 'react'
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
    hanldeCloseModal,
  }) => {
    return (
      <Modal open={isOpenModal} onClose={hanldeCloseModal}>
        <div className="modal__container">
          <Form onSubmit={handleSubmit}>
            <Box className={styles.modal__box}>
              <Typography variant="body1">Изменение пароля</Typography>
              <CloseIcon
                onClick={hanldeCloseModal}
                className={styles.modal__close_button}
              />
            </Box>
            <TextField
              className={styles.modal__text_field}
              label="Старый пароль"
              name="oldPassword"
              value={password.oldPassword}
              onChange={handleChangePassword}
              type="password"
              validationRules={[passwordValidationRule]}
              required
            />
            <TextField
              className={styles.modal__text_field}
              label="Новый пароль"
              name="newPassword"
              value={password.newPassword}
              onChange={handleChangePassword}
              type="password"
              validationRules={[passwordValidationRule]}
              required
            />
            <Typography variant="body1" color="error">
              {error}
            </Typography>
            <Box className={styles.modal__box}>
              <Button
                variant="contained"
                color="secondary"
                type="button"
                className={styles.modal__button}
                onClick={hanldeCloseModal}>
                Отмена
              </Button>
              <Button
                variant="contained"
                type="submit"
                className={styles.modal__button}>
                Изменить пароль
              </Button>
            </Box>
          </Form>
        </div>
      </Modal>
    )
  }
)
