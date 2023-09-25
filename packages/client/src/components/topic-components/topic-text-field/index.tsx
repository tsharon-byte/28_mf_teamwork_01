import React, { memo, FC } from 'react'
import TextField from '../../text-field'
import { Avatar, InputAdornment } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { TopicTextFieldType } from './types'
import styles from './styles.module.css'
import { useUser } from '../../../hooks'
import { makeResourcePath } from '../../../helpers'

export const TopicTextField: FC<TopicTextFieldType> = memo(
  ({
    message,
    placeholder = 'Добавить новый комментарий...',
    handleChange,
    handleAddComment,
    handleKeyDown,
  }) => {
    const { user } = useUser()

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
              <Avatar
                className={styles.avatar}
                src={user?.avatar ? makeResourcePath(user.avatar) : ''}
              />
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
