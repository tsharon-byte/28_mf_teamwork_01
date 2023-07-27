import { Button as MuiButton, ThemeProvider } from '@mui/material'
import { FC } from 'react'
import { ButtonFC } from './types'
import { createTheme } from '@mui/material/styles'

const Button: FC<ButtonFC> = ({ name, type }) => {
  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            width: '100%',
            background: '#FCD448',
            color: '#171813',
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            fontWeight: '500',
            height: '43px',
            '&:hover': {
              background: '#fde17f',
            },
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <MuiButton type={type}>{name}</MuiButton>
    </ThemeProvider>
  )
}

export default Button
