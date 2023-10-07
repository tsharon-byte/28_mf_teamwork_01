import React, { FC, useEffect, useRef, useState } from 'react'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import './bomberman.css'
import { Button, Fab } from '@mui/material'
import {
  drawBomber,
  BOX_SIZE,
  GAME_COLUMNS,
  GAME_ROWS,
  drawLevel,
  level1,
} from '../../utils/animation/helpers'
import HeroSprite from '../../utils/animation/HeroSprite'
import useFullScreen from '../../utils/useFullScreen'
import StyledDialog from '../dialog/StyledDialog'
import EndGame from '../end-game/EndGame'
import IBombermanProps from './types'
import useMusicPlayer from '../../hooks/use-music-player'
const GEORGE = 'img/george.png'
import {
  Balloom,
  Oneal,
  Doll,
  Minvo,
  Kondoria,
  Ovapi,
  Pass,
  Pontan,
} from '../../game/enemies'
import type Enemy from '../../game/enemies/enemy'
import { GAME_DURATION } from '../../utils/constants'
import ProgressBar from './progress-bar'

const Bomberman: FC<IBombermanProps> = ({ onSuccess }) => {
  const ref = useRef(null)
  const timerRef = useRef<number | null>(null)

  const [fullScreenFlag, toggleFullScreen] = useFullScreen()
  const [bomber, setBomber] = useState<HeroSprite>()
  const [enemies, setEnemies] = useState<Enemy[]>([])
  const [level, setLevel] = useState(level1)
  const [currentPos, setCurrentPos] = useState<[number, number]>([1, 1])
  const [isStartGame, setIsStartGame] = useState(false)

  const [open, setOpen] = useState<boolean>(false)
  const [isSuccess, setSuccess] = useState<boolean>(false)

  const [playMusic, stopMusic] = useMusicPlayer()

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
      // @ts-ignore
      const ctx = ref.current.getContext('2d')
      drawLevel(level, ctx)
      setBomber(
        drawBomber(
          ctx,
          GEORGE,
          level,
          setLevel,
          currentPos[0],
          currentPos[1],
          setCurrentPos,
          successCallback,
          gameOverCallback
        )
      )

      const balloom = new Balloom(ctx, level, [13, 1])
      const oneal = new Oneal(ctx, level, [17, 1])
      const doll = new Doll(ctx, level, [20, 1])
      const minvo = new Minvo(ctx, level, [27, 1])
      const kondoria = new Kondoria(ctx, level, [29, 5])
      const ovapi = new Ovapi(ctx, level, [20, 11])
      const pass = new Pass(ctx, level, [14, 11])
      const pontan = new Pontan(ctx, level, [10, 11])
      setEnemies([balloom, oneal, doll, minvo, kondoria, ovapi, pass, pontan])
    }
  }, [ref.current, currentPos])

  const startGame = () => {
    if (bomber) {
      bomber.start()
    }
    enemies.forEach(enemy => enemy.start())
    playMusic()
    startTimer()
    setIsStartGame(() => true)
  }
  const stopGame = () => {
    window.location.reload()
    stopMusic()
    setIsStartGame(() => false)
  }

  const successCallback = () => {
    stopMusic()
    setSuccess(true)
    setOpen(true)
    onSuccess?.()
    setIsStartGame(() => false)
  }
  const gameOverCallback = () => {
    stopMusic()
    setSuccess(false)
    setOpen(true)
    setIsStartGame(() => false)
  }
  const handleCloseDialog = () => {
    window.location.reload()
    setOpen(false)
  }
  return (
    <div className="bomberman">
      <ProgressBar isStartGame={isStartGame} />
      <canvas
        data-testid="canvas"
        ref={ref}
        width={BOX_SIZE * (GAME_COLUMNS + 1)}
        height={BOX_SIZE * (GAME_ROWS + 1)}
      />
      <div className="bomberman__buttons">
        <Button onClick={startGame} disabled={isStartGame}>
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
