import React, {
  ChangeEvent,
  FC,
  memo,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react'
import TextField from '../../text-field'
import { InputAdornment, IconButton } from '@mui/material'
import { StyledEditIcon } from '../../icons/styled-edit-icon'
import { EditTextFieldType } from './types'
import styles from './styles.module.css'
import DoneIcon from '@mui/icons-material/Done'
import { FocusEventHandler } from 'react'

export const EditTextField: FC<EditTextFieldType> = memo(
  ({
    value = '',
    callback,
    mainColor = '#FFFFFF',
    hoverColor = '#FFD54F',
    position = 'end',
    label,
    name,
    validationRules,
  }) => {
    const [currentValue, setCurrentValue] = useState<string>(value)
    const [isEditing, setIsEditing] = useState(false)
    const textFieldRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
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
        if (textFieldRef.current && !isEditing) {
          textFieldRef.current.focus()
        }
      }, [setIsEditing, textFieldRef, isEditing]),
    }

    const handleFocus: FocusEventHandler<HTMLInputElement> = () => {
      setIsEditing(true)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
      buttonRef.current?.click?.()
      setIsEditing(false)
    }

    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      !isEditing && event.preventDefault()
    }

    return (
      <TextField
        inputRef={textFieldRef}
        className={styles.textField}
        name={name}
        label={label}
        value={currentValue}
        onChange={callbacks.hanldeChange}
        validationRules={validationRules}
        InputProps={{
          endAdornment: (
            <InputAdornment
              position={position}
              style={{ color: mainColor }}
              onClick={callbacks.handleEditMode}>
              <IconButton type="submit" ref={buttonRef} onClick={handleButtonClick}>
                {isEditing ? (
                    <DoneIcon className={styles.done} />
                ) : (
                    <StyledEditIcon mainColor={mainColor} hoverColor={hoverColor} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )
  }
)
