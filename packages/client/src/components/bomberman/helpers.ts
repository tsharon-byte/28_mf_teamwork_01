import Sprite from '../../utils/animation/Sprite'
import HeroSprite from '../../utils/animation/HeroSprite'

//size in pixels of one box
export const BOX_SIZE = 32
export const GAME_COLUMNS = 31
export const GAME_ROWS = 13
const NUMBER_OF_FRAMES = 4
const TICKS_PER_FRAME = 30
const SPRITE_HEIGHT = 50
const SPRITE_WIDTH = 192
const WALL = 'img/tile_wall.png'
const GRASS_COLOR = '#2E4701'

export const drawBomber = (
  ctx: CanvasRenderingContext2D,
  src: string,
  x0 = 0,
  y0 = 0
) => {
  const image = new Image()
  image.src = src
  return new HeroSprite({
    ctx: ctx,
    image: image,
    width: SPRITE_WIDTH,
    height: SPRITE_HEIGHT,
    numberOfFrames: NUMBER_OF_FRAMES,
    ticksPerFrame: TICKS_PER_FRAME,
    size: BOX_SIZE,
    background: GRASS_COLOR,
    x0,
    y0,
  })
}
export const drawSprite = (
  ctx: CanvasRenderingContext2D,
  src: string,
  x0 = 0,
  y0 = 0
) => {
  const image = new Image()
  image.src = src
  return new Sprite({
    ctx: ctx,
    image: image,
    width: SPRITE_WIDTH,
    height: SPRITE_HEIGHT,
    numberOfFrames: NUMBER_OF_FRAMES,
    ticksPerFrame: TICKS_PER_FRAME,
    size: BOX_SIZE,
    background: GRASS_COLOR,
    x0,
    y0,
  })
}

export const drawBorder = (ctx: CanvasRenderingContext2D) => {
  const image = new Image()
  image.src = WALL

  image.onload = function () {
    const borderPattern = ctx.createPattern(image, 'repeat')
    if (ctx) {
      // @ts-ignore
      ctx.fillStyle = borderPattern
      // Now draw same objects: first a rectangle
      ctx.fillRect(
        0,
        0,
        BOX_SIZE * (GAME_COLUMNS + 2),
        BOX_SIZE * (GAME_ROWS + 2)
      )
      ctx.fillStyle = GRASS_COLOR
      ctx.fillRect(
        BOX_SIZE,
        BOX_SIZE,
        BOX_SIZE * GAME_COLUMNS,
        BOX_SIZE * GAME_ROWS
      )
    }
  }
}
