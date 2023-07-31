import React, { FC, useEffect, useRef, useState } from 'react'
import './bomberman.css'
import { Button } from '@mui/material'
import {
  drawBomber,
  BOX_SIZE,
  GAME_COLUMNS,
  GAME_ROWS,
  drawLevel,
  drawSprite,
  EVIL_1_COORDINATES,
  EVIL_2_COORDINATES,
  getRandomAudio,
  level1,
} from './helpers'
import HeroSprite from '../../utils/animation/HeroSprite'
import Sprite from '../../utils/animation/Sprite'

const BETTY_SPRITE = 'img/betty.png'
const BETTY2_SPRITE = 'img/betty2.png'
const GEORGE = 'img/george.png'

const Bomberman: FC = () => {
  const ref = useRef(null)
  const audioRef = useRef(null)
  const [bomber, setBomber] = useState<HeroSprite>()
  const [evil1, setEvil1] = useState<Sprite>()
  const [evil2, setEvil2] = useState<Sprite>()
  const [level, setLevel] = useState(level1)
  const [currentPos, setCurrentPos] = useState<[number, number]>([
    BOX_SIZE,
    BOX_SIZE,
  ])

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
          setCurrentPos
        )
      )
      setEvil1(
        drawSprite(
          ctx,
          BETTY_SPRITE,
          BOX_SIZE * EVIL_1_COORDINATES[1],
          BOX_SIZE * EVIL_1_COORDINATES[0]
        )
      )
      setEvil2(
        drawSprite(
          ctx,
          BETTY2_SPRITE,
          BOX_SIZE * EVIL_2_COORDINATES[1],
          BOX_SIZE * EVIL_2_COORDINATES[0]
        )
      )
    }
  }, [ref.current, currentPos])
  useEffect(() => {
    if (audioRef.current) {
      // @ts-ignore
      audioRef.current.volume = 0.1
    }
  }, [audioRef.current])
  const playMusic = () => {
    // @ts-ignore
    audioRef.current.play()
  }
  const stopMusic = () => {
    // @ts-ignore
    audioRef.current.pause()
  }

  const startGame = () => {
    if (bomber) {
      bomber.start()
    }
    if (evil1) {
      evil1.start()
    }
    if (evil2) {
      evil2.start()
    }

    playMusic()
  }
  const stopGame = () => {
    window.location.reload()
    stopMusic()
  }
  return (
    <div className="bomberman">
      <canvas
        ref={ref}
        width={BOX_SIZE * (GAME_COLUMNS + 1)}
        height={BOX_SIZE * (GAME_ROWS + 1)}
      />
      <audio ref={audioRef} src={getRandomAudio()} preload="auto" />
      <div className="bomberman__buttons">
        <Button onClick={startGame}>Начать Игру</Button>
        <Button onClick={stopGame}>Окончить Игру</Button>
      </div>
    </div>
  )
}
export default Bomberman
