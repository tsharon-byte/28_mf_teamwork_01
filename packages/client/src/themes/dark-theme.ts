import { createTheme } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    gold: Palette['primary']
    silver: Palette['primary']
    bronze: Palette['primary']
  }

  interface PaletteOptions {
    gold?: PaletteOptions['primary']
    silver?: PaletteOptions['primary']
    bronze?: PaletteOptions['primary']
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    gold: true
    silver: true
    bronze: true
  }
}

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
    gold: {
      main: '#ffd700',
    },
    silver: {
      main: '#C0C0C0',
    },
    bronze: {
      main: '#cd7f32',
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          ul: {
            display: 'flex',
            li: {
              a: {
                color: 'white',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                fontSize: '1rem',
                lineHeight: 1.5,
                '&:hover': {
                  opacity: 0.9,
                },
                '&.active': {
                  fontWeight: 'bold',
                  color: '#fff9c4',
                },
              },
              '.MuiAvatar-root, .MuiCircularProgress-root': {
                width: '36px !important',
                height: '36px !important',
              },
            },
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          width: 'auto',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#a72721',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          'th, th p': {
            fontWeight: 'bold',
          },
          td: {
            p: {
              marginTop: '2px',
            },
          },
          '&:last-child': {
            td: {
              border: 0,
            },
          },
          '&:nth-of-type(2n)': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
  },
})

export default darkTheme
