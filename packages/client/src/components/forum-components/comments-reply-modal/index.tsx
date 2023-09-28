import React, { FC, memo } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import Form from '../../form'
import styles from '../create-topic-modal/styles.module.css'
import IconButton from '@mui/material/IconButton'
import { Close } from '@mui/icons-material'
import TextField from '../../text-field'
import { TCommentsReplyModal } from './types'

const CommentsReplyModal: FC<TCommentsReplyModal> = ({
  isOpenModal = false,
  handleCloseModal,
  handleSendReply,
  handleCancel,
  handleChangeMessage
}) => {
  return (
    <Modal open={isOpenModal} onClose={handleCloseModal}>
      <Form onSubmit={handleSendReply}>
        <Box className={styles.box}>
          <Typography variant="h5">Ответ на сообщение</Typography>
          <IconButton size="large" color="inherit" onClick={handleCloseModal}>
            <Close />
          </IconButton>
        </Box>
        <TextField
          className={styles.field}
          onChange={handleChangeMessage}
          label="Сообщение"
          required
        />
        <Box className={styles.buttons}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancel}
            className={styles.button}>
            Отменить
          </Button>
          <Button variant="contained" type="submit" className={styles.button}>
            Отправить
          </Button>
        </Box>
      </Form>
    </Modal>
  )
}

export default memo(CommentsReplyModal)
