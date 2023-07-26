import Sprite from '../../utils/Sprite'

//size in pixels of one box
export const BOX_SIZE = 32
export const GAME_COLUMNS = 31
export const GAME_ROWS = 13
const WALL = 'img/tile_wall.png'
const GRASS_COLOR = '#2E4701'

export const drawBomber = (
  ctx: CanvasRenderingContext2D,
  src: string,
  x0 = 0,
  y0 = 0
) => {
  const coinImage = new Image()
  coinImage.src = src
  return new Sprite({
    // @ts-ignore
    ctx: ctx,
    image: coinImage,
    width: 192,
    height: 50,
    numberOfFrames: 4,
    ticksPerFrame: 30,
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
