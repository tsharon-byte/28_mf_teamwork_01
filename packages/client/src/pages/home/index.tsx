import { FC, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Box } from '@mui/material'
import { PageLayout } from '../../layouts'
import { Title } from '../../components'
import styles from './styles.module.css'
import StyledDialog from '../../components/dialog/StyledDialog'
import GameRules from '../../components/game-rules/GameRules'
import { useOAuth } from '../../hooks'

const Home: FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { yandexLogin } = useOAuth()

  useEffect(() => {
    yandexLogin()
  }, [])

  return (
    <PageLayout pageClassName={styles.page} mainClassName={styles.main}>
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
        <Button
          className={styles.link}
          onClick={() => setOpen(!open)}
          variant="outlined"
          size="large">
          Правила игры
        </Button>
        <StyledDialog
          open={open}
          title="Правила игры"
          handleClose={() => setOpen(false)}>
          <GameRules />
        </StyledDialog>
      </Box>
    </PageLayout>
  )
}

export default Home
