import React, { FocusEventHandler, useState } from 'react'
import { TextField as MUITextField, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'

import type TextFieldFC from './types'

const TextField: TextFieldFC = ({
  validationRules,
  onFocus,
  onBlur,
  error,
  helperText,
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

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '.MuiInputBase-input': {
              color: '#FFF',
            },
            '.MuiInputLabel-root': {
              color: 'rgba(255, 255, 255, 0.50)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FFF',
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#FFF',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.50)',
            },
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <MUITextField
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={hasError}
        helperText={errorText}
      />
    </ThemeProvider>
  )
}

export default TextField
