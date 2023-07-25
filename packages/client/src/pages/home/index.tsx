import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Box } from '@mui/material'
import { PageLayout } from '../../layouts'
import { Title } from '../../components'
import styles from './styles.module.css'

const Home: FC = () => {
  return (
    <PageLayout pageClassName={styles.page}>
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
