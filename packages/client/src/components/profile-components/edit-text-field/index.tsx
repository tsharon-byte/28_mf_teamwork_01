import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react'
import TextField from '../../text-field'
import { InputAdornment } from '@mui/material'
import { StyledEditIcon } from '../../icons/styled-edit-icon'
import { EditTextFieldType } from './types'
import styles from './styles.module.css'

export const EditTextField: FC<EditTextFieldType> = memo(
  ({
    value = '',
    callback,
    mainColor = '#FFFFFF',
    hoverColor = '#FFD54F',
    position = 'end',
  }) => {
    const [currentValue, setCurrentValue] = useState<string>(value)
    const [isEditing, setIsEditing] = useState(false)
    const callbacks = {
      hanldeChange: useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          if (isEditing) {
            const { value } = e.currentTarget
            setCurrentValue(value)
            if (callback) {
              callback(currentValue)
            }
          }
        },
        [isEditing]
      ),
      handleEditMode: useCallback(() => {
        setIsEditing(prevIsEditing => !prevIsEditing)
      }, [setIsEditing]),
    }
    return (
      <TextField
        className={styles.textField}
        name="email"
        value={currentValue}
        onChange={callbacks.hanldeChange}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position={position}
              style={{ color: mainColor }}
              onClick={callbacks.handleEditMode}>
              <StyledEditIcon mainColor={mainColor} hoverColor={hoverColor} />
            </InputAdornment>
          ),
        }}
      />
    )
  }
)
