import React, { FC, useEffect, useRef, useState } from 'react'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import './bomberman.css'
import { Button, Fab } from '@mui/material'
import {
  BOX_SIZE,
  GAME_COLUMNS,
  GAME_ROWS,
} from '../../utils/animation/helpers'
import useFullScreen from '../../utils/useFullScreen'
import StyledDialog from '../dialog/StyledDialog'
import EndGame from '../end-game/EndGame'
import IBombermanProps from './types'
import useMusicPlayer from '../../hooks/use-music-player'
import Game from '../../game'
import { GameEvent, TScore } from '../../game/types'
import eventBus from '../../game/core/event-bus'
import { GAME_DURATION } from '../../utils/constants'
import ProgressBar from './progress-bar'
import { useAppDispatch } from '../../store/hooks'
import UserSlice from '../../store/slices/user-slice'

const Bomberman: FC<IBombermanProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch()

  const ref = useRef<HTMLCanvasElement>(null)
  const timerRef = useRef<number | null>(null)

  const [fullScreenFlag, toggleFullScreen] = useFullScreen()
  const [playMusic, stopMusic] = useMusicPlayer()

  const [started, setStarted] = useState(false)
  const [open, setOpen] = useState<boolean>(false)
  const [isSuccess, setSuccess] = useState<boolean>(false)

  const startTimer = () => {
    if (timerRef.current !== null) return

    timerRef.current = window.setTimeout(gameOverCallback, GAME_DURATION * 1000)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (ref.current) {
      new Game(ref.current)
    }
  }, [ref])

  const startGame = () => {
    if (!started) {
      setStarted(true)
      eventBus.emit(GameEvent.StartGame)
      eventBus.on(GameEvent.GameOverSuccess, data => successCallback(data))
      eventBus.on(GameEvent.GameOverFailure, data => gameOverCallback(data))
      eventBus.on(GameEvent.EnemyKilled, data => counter(data))
      playMusic()
      startTimer()
    }
  }

  const counter = (data: TScore) => {
    dispatch(UserSlice.actions.addScore(data.score))
  }

  const stopGame = () => {
    if (started) {
      setStarted(false)
      eventBus.emit(GameEvent.StopGame)
      window.location.reload()
    }
  }

  const successCallback = (data: TScore) => {
    stopMusic()
    setSuccess(true)
    setOpen(true)
    onSuccess?.(data.score)
  }
  const gameOverCallback = (data: TScore) => {
    stopMusic()
    setSuccess(false)
    setOpen(true)
    onSuccess?.(data.score)
  }
  const handleCloseDialog = () => {
    window.location.reload()
    setOpen(false)
  }
  return (
    <div className="bomberman">
      <ProgressBar isStartGame={started} />
      <canvas
        data-testid="canvas"
        ref={ref}
        width={BOX_SIZE * (GAME_COLUMNS + 1)}
        height={BOX_SIZE * (GAME_ROWS + 1)}
      />
      <div className="bomberman__buttons">
        <Button onClick={startGame} disabled={started}>
          Начать Игру
        </Button>
        <Button onClick={stopGame}>Окончить Игру</Button>
        <Fab
          onClick={toggleFullScreen}
          aria-label="full screen mode"
          color="primary"
          size="small">
          {!fullScreenFlag ? <FullscreenIcon /> : <FullscreenExitIcon />}
        </Fab>
      </div>
      <StyledDialog
        open={open}
        title="Игра окончена"
        handleClose={handleCloseDialog}>
        <EndGame isSuccess={isSuccess} />
      </StyledDialog>
    </div>
  )
}
export default Bomberman
