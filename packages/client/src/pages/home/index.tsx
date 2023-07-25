import { FC, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Box } from '@mui/material'
import { PageLayout } from '../../layouts'
import { Title } from '../../components'
import styles from './styles.module.css'

const Home: FC = () => {
  useEffect(() => {
    document.body.style.backgroundImage = 'url("home-page.png")'
    return () => {
      document.body.style.backgroundImage = 'none'
    }
  }, [])

  return (
    <PageLayout>
      <Box
        display="flex"
        flexDirection="column"
        mr="auto"
        gap="40px"
        ml="40px"
        mb="400px">
        <Title>Boomberman</Title>
        <Button
          component={NavLink}
          to="/game"
          variant="outlined"
          size="large"
          color="inherit"
          className={styles.button}>
          Начать игру
        </Button>
      </Box>
    </PageLayout>
  )
}

export default Home
