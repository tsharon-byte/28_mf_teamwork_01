import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import explosionImg from '../../assets/images/explosion.svg'
import StyledLink from '../../components/styled-link'
import styles from './styles.module.css'

const Image = styled('img')({
  marginBottom: '-5px',
})

const Page404: FC = () => {
  return (
    <Box className={styles.layout}>
      <Image src={explosionImg} alt="Взрыв" />
      <Box className={styles.box}>
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
      <StyledLink to="/" text="Вернуться в главное меню" />
    </Box>
  )
}

export default Page404
