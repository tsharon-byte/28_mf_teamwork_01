import React, { FC, useEffect, useRef } from 'react'
import './bomberman.css'
import Sprite from '../../utils/Sprite'
import { Button } from '@mui/material'
import {
  drawBomber,
  drawBorder,
  BOX_SIZE,
  GAME_COLUMNS,
  GAME_ROWS,
} from './helpers'

const BETTY_SPRITE = 'img/betty.png'
const BETTY2_SPRITE = 'img/betty2.png'
const GEORGE = 'img/george.png'

const Bomberman: FC = () => {
  const ref = useRef(null)
  let bomber: Sprite | undefined
  let bomber2: Sprite | undefined
  let bomber3: Sprite | undefined

  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      const ctx = ref.current.getContext('2d')
      drawBorder(ctx)
      bomber = drawBomber(ctx, BETTY_SPRITE)
      bomber2 = drawBomber(ctx, BETTY2_SPRITE, BOX_SIZE, 0)
      bomber3 = drawBomber(ctx, GEORGE, BOX_SIZE, BOX_SIZE)
    }
  }, [ref.current])

  const startGame = () => {
    if (bomber) {
      bomber.start()
    }
    if (bomber2) {
      bomber2.start()
    }
    if (bomber3) {
      bomber3.start()
    }
  }
  const stopGame = () => {
    if (bomber) {
      bomber.stop()
    }
    if (bomber2) {
      bomber2.stop()
    }
    if (bomber3) {
      bomber3.stop()
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
