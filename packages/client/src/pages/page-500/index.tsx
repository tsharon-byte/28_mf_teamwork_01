import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import bombImage from '../../assets/images/bomb.svg'
import StyledLink from '../../components/styled-link'
import styles from './styles.module.css'

const Image = styled('img')({
  marginBottom: '57px',
})

const Page500: FC = () => {
  return (
    <Box className={styles.layout}>
      <Image src={bombImage} alt="Бомба" />
      <Box className={styles.box}>
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
      <StyledLink href="/" text="Вернуться в главное меню" />
    </Box>
  )
}

export default Page500
