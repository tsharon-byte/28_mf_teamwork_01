import { FC } from 'react'
import { Link, Box, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material'
import { createTheme, styled } from '@mui/material/styles'
import bombImage from '../../assets/images/bomb.svg'

const theme = createTheme({
  typography: {
    h1: {
      color: '#FFFFFF',
      fontFamily: 'Notable',
      lineHeight: '20px',
      fontSize: '128px',
      fontWeight: 400,
    },
    h2: {
      color: '#FFFFFF',
      fontFamily: 'Notable',
      lineHeight: '20px',
      fontSize: '64px',
      fontWeight: 400,
    },
  },
})

const Image = styled('img')({
  marginBottom: '57px',
})

const Page500: FC = () => {
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
        <Image src={bombImage} alt="Бомба" />
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
            500
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1em', sm: '2em' } }}>
            Internal Server Error
          </Typography>
        </Box>

        <Link
          variant="body1"
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
          Вернуться в главное меню
        </Link>
      </Box>
    </ThemeProvider>
  )
}

export default Page500
