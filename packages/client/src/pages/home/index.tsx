import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Box } from '@mui/material'
import { PageLayout } from '../../layouts'
import { Title } from '../../components'
import styles from './styles.module.css'

const Home: FC = () => {
  return (
    <PageLayout pageClassName={styles.page}>
      <Box className={styles.content}>
        <Title>Bomberman</Title>
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
