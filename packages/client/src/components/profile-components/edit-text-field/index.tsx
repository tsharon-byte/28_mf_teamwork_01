import React, {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useRef,
  useState,
} from 'react'
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
    placeholder,
  }) => {
    const [currentValue, setCurrentValue] = useState<string>(value)
    const [isEditing, setIsEditing] = useState(false)
    const fieldRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
    const callbacks = {
      hanldeChange: useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          if (isEditing) {
            const { value } = e.currentTarget
            setCurrentValue(value)
            if (fieldRef.current) {
              fieldRef.current.focus()
            }
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
        placeholder={placeholder}
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
