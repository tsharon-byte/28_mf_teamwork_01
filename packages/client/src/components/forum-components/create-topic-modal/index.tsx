import React, { FC, memo, useRef } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import Form from '../../form'
import { CreateTopicModalType } from './types'
import { CloseIcon } from '../../icons/close-icon'
import TextField from '../../text-field'
import styles from './styles.module.css'

export const CreateTopicModal: FC<CreateTopicModalType> = memo(
  ({
    isOpenModal = false,
    handleCloseModal,
    handleCreateChatSubmit,
    handleCancel,
    handleChange,
    error,
  }) => {
    const formRef = useRef<HTMLFormElement>(null)
    return (
      <Modal open={isOpenModal} onClose={handleCloseModal}>
        <Form ref={formRef} onSubmit={handleCreateChatSubmit}>
          <Box className={styles.box}>
            <Typography variant="h5">Изменение пароля</Typography>
            <CloseIcon callback={handleCloseModal} />
          </Box>
          <TextField
            className={styles.field}
            onChange={handleChange}
            label="Создать новый топик"
            focused
          />
          <Typography variant="body1" color="error">
            {error}
          </Typography>
          <Box className={styles.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}>
              Отменить
            </Button>
            <Button variant="contained" type="submit">
              Создать топик
            </Button>
          </Box>
        </Form>
      </Modal>
    )
  }
)
