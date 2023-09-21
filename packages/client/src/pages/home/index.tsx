import React, { FC, useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Box } from '@mui/material'
import { PageLayout } from '../../layouts'
import { Title } from '../../components'
import styles from './styles.module.css'
import StyledDialog from '../../components/dialog/StyledDialog'
import GameRules from '../../components/game-rules/GameRules'
import { useOAuth } from '../../hooks'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

import { userSelector } from '../../store/slices/user-slice/selectors'
import { changeThemeThunk } from '../../store/slices/user-slice/thunks'

const Home: FC = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { yandexLogin } = useOAuth()
  const dispatch = useAppDispatch()
  const { mode } = useAppSelector(userSelector)
  const toggleThemeCallback = useCallback(() => {
    const newMode = mode === 'dark' ? 'light' : 'dark'
    dispatch(changeThemeThunk(newMode))
  }, [mode])

  useEffect(() => {
    yandexLogin()
  }, [])

  return (
    <PageLayout
      pageClassName={styles.page}
      mainClassName={styles.main}
      mode={mode}
      toggleTheme={toggleThemeCallback}>
      <Box className={styles.content}>
        <Title>Bomberman</Title>
        <Button
          component={NavLink}
          color="secondary"
          variant="contained"
          to="/game"
          size="large"
          className={styles.button}>
          Начать игру
        </Button>
        <Button
          color="secondary"
          variant="contained"
          className={styles.link}
          onClick={() => setOpen(!open)}
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
