import React, { FocusEventHandler, useState } from 'react'
import { TextField as MUITextField } from '@mui/material'

import type TextFieldFC from './types'

const TextField: TextFieldFC = ({
  validationRules,
  onFocus,
  onBlur,
  error,
  helperText,
  inputProps,
  ...props
}) => {
  const [hasError, setHasError] = useState(error)
  const [errorText, setErrorText] = useState(helperText)

  const clearError = () => {
    setHasError(false)
    setErrorText('')
  }

  const handleFocus: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = event => {
    onFocus?.(event)
    clearError()
  }

  const handleBlur: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = event => {
    onBlur?.(event)
    clearError()
    validationRules?.forEach(validationRule => {
      if (!validationRule.validate(event.target.value)) {
        setHasError(true)
        setErrorText(validationRule.error)
      }
    })
  }

  return (
    <MUITextField
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      error={hasError}
      helperText={errorText}
      inputProps={inputProps}
    />
  )
}

export default TextField
