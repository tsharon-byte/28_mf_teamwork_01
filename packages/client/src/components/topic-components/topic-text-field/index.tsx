import React, { memo, FC } from 'react'
import TextField from '../../text-field'
import { Avatar, InputAdornment } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { TopicTextFieldType } from './types'
import styles from './styles.module.css'

export const TopicTextField: FC<TopicTextFieldType> = memo(
  ({
    message,
    placeholder = 'Добавить новый комментарий...',
    handleChange,
    handleAddComment,
    handleKeyDown,
    avatar,
  }) => {
    return (
      <TextField
        className={styles.field}
        name="message"
        value={message}
        multiline
        rows={4}
        placeholder={placeholder}
        autoComplete="off"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Avatar className={styles.avatar} src={avatar || ''} />
            </InputAdornment>
          ),
          endAdornment: message && (
            <InputAdornment position="end">
              <div onClick={handleAddComment}>
                <SendIcon className={styles.icon} />
              </div>
            </InputAdornment>
          ),
        }}
      />
    )
  }
)
