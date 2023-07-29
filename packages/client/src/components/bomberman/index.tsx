import React, { FC, useEffect, useRef, useState } from 'react'
import './bomberman.css'
import Sprite from '../../utils/animation/Sprite'
import { Button } from '@mui/material'
import {
  drawBomber,
  drawBorder,
  BOX_SIZE,
  GAME_COLUMNS,
  GAME_ROWS,
  drawSprite,
} from './helpers'
import HeroSprite from '../../utils/animation/HeroSprite'

const BETTY_SPRITE = 'img/betty.png'
const BETTY2_SPRITE = 'img/betty2.png'
const GEORGE = 'img/george.png'

const Bomberman: FC = () => {
  const ref = useRef(null)
  const [bomber, setBomber] = useState<HeroSprite>()
  const [sprite1, setSprite1] = useState<Sprite>()
  const [sprite2, setSprite2] = useState<Sprite>()

  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      const ctx = ref.current.getContext('2d')
      drawBorder(ctx)
      setBomber(drawBomber(ctx, BETTY_SPRITE))
      setSprite1(drawSprite(ctx, BETTY2_SPRITE, BOX_SIZE, 0))
      setSprite2(drawSprite(ctx, GEORGE, BOX_SIZE, BOX_SIZE))
    }
  }, [ref.current])

  const startGame = () => {
    if (bomber) {
      bomber.start()
    }
    if (sprite1) {
      sprite1.start()
    }
    if (sprite2) {
      sprite2.start()
    }
  }
  const stopGame = () => {
    if (bomber) {
      bomber.stop()
    }
    if (sprite1) {
      sprite1.stop()
    }
    if (sprite2) {
      sprite2.stop()
    }
  }
  return (
    <div className="bomberman">
      <canvas
        ref={ref}
        width={BOX_SIZE * (GAME_COLUMNS + 2)}
        height={BOX_SIZE * (GAME_ROWS + 2)}
      />
      <div className="bomberman__buttons">
        <Button onClick={startGame}>Начать Игру</Button>
        <Button onClick={stopGame}>Окончить Игру</Button>
      </div>
    </div>
  )
}
export default Bomberman
