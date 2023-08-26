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
    MuiCssBaseline: {
      styleOverrides: {
        '*::-webkit-scrollbar': {
          width: '4px',
          height: '4px',
        },
        '*::-webkit-scrollbar-track': {
          margin: '16px 0',
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'white',
          borderRadius: '1px',
        },
      },
    },
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
          input: {
            '&:-webkit-autofill, &:-webkit-autofill:focus': {
              transition: 'background-color 0s 600000s, color 0s 600000s',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#313131',
          minWidth: '600px',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#ffd700',
          fontFamily: 'Notable Regular',
          fontSize: '32px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          backgroundColor: '#212121',
          color: '#afafaf',
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
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff80',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          form: {
            backgroundColor: '#171813',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ffffff',
            borderRadius: '8px',
            maxHeight: 'max-content',
            minWidth: '670px',
            padding: '40px 24px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: '#FFFFFF',
          fontFamily: 'Notable',
          fontSize: '128px',
          fontWeight: 400,
          padding: 16,
          textAlign: 'center',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#171813',
          padding: '2px 4px',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#FFFFFF',
        },

        select: {
          '&': {
            boxShadow: '0 0 0 2px #FFFFFF',
            color: '#FFFFFF80',
            borderColor: '#FFFFFF',
            minWidth: 236,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
})

export default darkTheme
