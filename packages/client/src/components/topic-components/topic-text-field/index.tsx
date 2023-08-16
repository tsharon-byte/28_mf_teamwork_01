import React, { memo, FC } from 'react'
import TextField from '../../text-field'
import { InputAdornment } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { TopicTextFieldType } from './types'
import styles from './styles.module.css'

export const TopicTextField: FC<TopicTextFieldType> = memo(
  ({
    message,
    label = 'Введите сообщение',
    handleChange,
    handleAddComment,
    handleKeyDown,
  }) => {
    return (
      <TextField
        className={styles.field}
        name="message"
        value={message}
        multiline
        rows={4}
        label={label}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: message && (
            <InputAdornment position="end">
              <SendIcon onClick={handleAddComment} className={styles.icon} />
            </InputAdornment>
          ),
        }}
      />
    )
  }
)
