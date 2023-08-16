import React, { FC, memo } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import Form from '../../form'
import { CreateTopicModalType } from './types'
import TextField from '../../text-field'
import styles from './styles.module.css'
import IconButton from '@mui/material/IconButton'
import { Close } from '@mui/icons-material'

export const CreateTopicModal: FC<CreateTopicModalType> = memo(
  ({
    isOpenModal = false,
    handleCloseModal,
    handleCreateChatSubmit,
    handleCancel,
    handleChange,
    error,
  }) => {
    return (
      <Modal open={isOpenModal} onClose={handleCloseModal}>
        <Form onSubmit={handleCreateChatSubmit}>
          <Box className={styles.box}>
            <Typography variant="h5">Создание темы для обсуждения</Typography>
            <IconButton size="large" color="inherit" onClick={handleCloseModal}>
              <Close />
            </IconButton>
          </Box>
          <TextField
            className={styles.field}
            onChange={handleChange}
            label="Создание темы"
            focused
          />
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
          <Box className={styles.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
              className={styles.button}>
              Отменить
            </Button>
            <Button variant="contained" type="submit" className={styles.button}>
              Создать топик
            </Button>
          </Box>
        </Form>
      </Modal>
    )
  }
)
