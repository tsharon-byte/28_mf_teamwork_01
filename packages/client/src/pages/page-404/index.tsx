import { FC } from 'react'
import { Link, Box, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material'
import { createTheme, styled } from '@mui/material/styles'
import explosionImg from '../../assets/images/explosion.svg'
import '@fontsource/khand/400.css'
import '@fontsource/notable/400.css'

const theme = createTheme({
  typography: {
    h1: {
      color: '#FFFFFF',
      fontFamily: 'Notable',
      lineHeight: '20px',
      fontWeight: 400,
      fontSize: '128px',
    },
    h2: {
      color: '#FFFFFF',
      fontFamily: 'Notable',
      lineHeight: '20px',
      fontSize: '64px',
      fontWeight: 400,
    },
    body1: {
      fontFamily: 'Khand',
    },
  },
})

const Image = styled('img')({
  marginBottom: '-5px',
})

const Page404: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: 1,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#171813',
        }}>
        <Image src={explosionImg} alt="Взрыв" />
        <Box
          sx={{
            width: 1,
            minHeight: 200,
            gap: '24px',
            borderTop: '5px solid #FFFFFF',
            borderBottom: '5px solid #FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography
            variant="h1"
            gutterBottom
            sx={{ fontSize: { xs: '2em', sm: '4em' } }}>
            404 NOT FOUND
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1em', sm: '2em' } }}>
            GAME OVER
          </Typography>
        </Box>

        <Link
          sx={{
            fontFamily: 'Khand',
            lineHeight: '20px',
            fontSize: '16px',
            color: '#FFFFC7',
            textDecoration: 'none',
            marginTop: '50px',
            ':hover': {
              textDecoration: 'underline',
            },
          }}
          href="/">
          <Typography variant="body1">Вернуться в главное меню</Typography>
        </Link>
      </Box>
    </ThemeProvider>
  )
}

export default Page404
