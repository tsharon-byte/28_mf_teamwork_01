import React, { FC, useEffect, useRef, useState } from 'react'
import './Game.css'
import Sprite from '../../utils/Sprite'

const size = 32
const width = 31
const height = 13
const BETTY_SPRITE = 'img/betty.png'
const BETTY2_SPRITE = 'img/betty2.png'
const GEORGE = 'img/george.png'
const WALL = 'img/tile_wall.png'

const Game: FC = () => {
  const ref = useRef(null)
  let bomber: Sprite | undefined
  let bomber2: Sprite | undefined
  let bomber3: Sprite | undefined

  const drawBomber = (src: string, x0 = 0, y0 = 0) => {
    const coinImage = new Image()
    coinImage.src = src
    return new Sprite({
      // @ts-ignore
      ctx: ref.current.getContext('2d'),
      image: coinImage,
      width: 192,
      height: 50,
      numberOfFrames: 4,
      ticksPerFrame: 30,
      size,
      background: '#000000',
      x0,
      y0,
    })
  }

  const drawBorder = () => {
    // @ts-ignore
    const ctx = ref.current.getContext('2d')
    const image = new Image()
    image.src = WALL

    image.onload = function () {
      const borderPattern = ctx.createPattern(image, 'repeat')
      // @ts-ignore
      ctx.fillStyle = borderPattern
      // Now draw same objects: first a rectangle
      ctx.fillRect(0, 0, size * (width + 2), size * (height + 2))
      ctx.fillStyle = '#000000'
      ctx.fillRect(size, size, size * width, size * height)
    }
  }

  useEffect(() => {
    if (ref.current) {
      drawBorder()
      bomber = drawBomber(BETTY_SPRITE)
      bomber2 = drawBomber(BETTY2_SPRITE, size, 0)
      bomber3 = drawBomber(GEORGE, size, size)
    }
  }, [])

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
    //document.location.reload();
  }
  return (
    // @ts-ignore
    <div className="game">
      <canvas
        ref={ref}
        width={size * (width + 2)}
        height={size * (height + 2)}
      />
      <div className="game_buttons">
        <button onClick={startGame}>Начать Игру</button>
        <button onClick={stopGame}>Окончить Игру</button>
      </div>
    </div>
  )
}
export default Game
