import { createTheme } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#ffd54f',
      light: '#ffe082',
      dark: '#ffc107',
    },
    secondary: {
      main: '#fff9c4',
      light: '#fffde7',
      dark: '#fff59d',
    },
    error: {
      main: '#b71c1c',
      light: '#c62828',
      dark: '#a72721',
    },
    background: {
      default: '#212121',
    },
    text: {
      primary: '#ffffff',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& > fieldset': {
              borderColor: '#ffffff',
            },
          },
          '& .MuiFormLabel-colorPrimary': {
            color: '#ffffff',
          },
        },
      },
    },
  },
})

export default darkTheme
