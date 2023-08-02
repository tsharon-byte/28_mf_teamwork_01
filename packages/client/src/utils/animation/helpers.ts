import Sprite from './Sprite'
import HeroSprite from './HeroSprite'
import { BRICK_CHARACTER, PORTAL_CHARACTER, WALL_CHARACTER } from './constants'

//size in pixels of one box
export const BOX_SIZE = 32
export const GAME_COLUMNS = 31
export const GAME_ROWS = 13
const NUMBER_OF_FRAMES = 4
const TICKS_PER_FRAME = 15
const SPRITE_HEIGHT = 50
const SPRITE_WIDTH = 192
const WALL = 'img/tile_wall.png'
const PORTAL = 'img/portal.png'
const BRICK = 'img/tile_wood.png'
const GRASS = 'img/tile_grass.png'

export const EVIL_1_COORDINATES = [1, 13]
export const EVIL_2_COORDINATES = [1, 17]

const musicList = [
  'audio/bomberman.mp3',
  'audio/Darkman007_2021_Metaltoads_01_Title_Theme.mp3',
]

export const level1 = [
  '###############################',
  '#p     ** *  1 * 2 *  * * *   #',
  '# # # #*# # #*#*# # # #*#*#*# #',
  '#  x*     ***  *  1   * 2 * * #',
  '# # # # # #*# # #*#*# # # # #*#',
  '#f         x **  *  *   1     #',
  '# # # # # # # # # #*# #*# # # #',
  '#*  *      *  *      *        #',
  '# # # # #*# # # #*#*# # # # # #',
  '#*    **  *       *           #',
  '# #*# # # # # # #*# # # # # # #',
  '#           *   *  *          #',
  '###############################',
]

export const drawBomber = (
  ctx: CanvasRenderingContext2D,
  src: string,
  level: string[],
  setLevel: (value: ((prevState: string[]) => string[]) | string[]) => void,
  x0 = 0,
  y0 = 0,
  setCurrentPos: (
    value:
      | ((prevState: [number, number]) => [number, number])
      | [number, number]
  ) => void
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
    level,
    setLevel,
    x0,
    y0,
    setCurrentPos,
  })
}
export const drawSprite = (
  ctx: CanvasRenderingContext2D,
  src: string,
  x0 = 0,
  y0 = 0,
  numberOfFrames = NUMBER_OF_FRAMES,
  width = SPRITE_WIDTH,
  height = SPRITE_HEIGHT,
  ticksPerFrame = TICKS_PER_FRAME
) => {
  const image = new Image()
  image.src = src
  return new Sprite({
    ctx: ctx,
    image: image,
    width,
    height,
    numberOfFrames,
    ticksPerFrame,
    size: BOX_SIZE,
    x0,
    y0,
  })
}

const drawItem = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  src: string,
  width = BOX_SIZE,
  height = BOX_SIZE
) => {
  const image = new Image()
  image.src = src

  image.onload = function () {
    ctx.drawImage(image, x, y, width, height)
  }
}

export const drawWall = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) => {
  drawItem(ctx, x, y, WALL)
}

export const drawPortal = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) => {
  drawItem(ctx, x, y, PORTAL)
}

export const drawBrick = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) => {
  drawItem(ctx, x, y, BRICK)
}

export const drawGrass = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) => {
  drawItem(ctx, x, y, GRASS)
}
export const drawLevel = (level: string[], ctx: CanvasRenderingContext2D) => {
  for (let j = 0; j < GAME_ROWS; j++) {
    for (let i = 0; i < GAME_COLUMNS; i++) {
      switch (level[j][i]) {
        case BRICK_CHARACTER:
          drawBrick(ctx, BOX_SIZE * (i + 1), BOX_SIZE * (j + 1))
          break
        case WALL_CHARACTER:
          drawWall(ctx, BOX_SIZE * (i + 1), BOX_SIZE * (j + 1))
          break
        case PORTAL_CHARACTER:
          drawPortal(ctx, BOX_SIZE * (i + 1), BOX_SIZE * (j + 1))
          break
        default:
          drawGrass(ctx, BOX_SIZE * (i + 1), BOX_SIZE * (j + 1))
      }
    }
  }
}

export function noCollision(level: string[], newPosition: number[]) {
  if (
    newPosition[1] + 1 === EVIL_1_COORDINATES[1] &&
    newPosition[0] + 1 === EVIL_1_COORDINATES[0]
  ) {
    return false
  }
  const mapValue = level[newPosition[0] + 1][newPosition[1] + 1]

  return !(mapValue === WALL_CHARACTER || mapValue === BRICK_CHARACTER)
}

export const portalIsFound = (level: string[], newPosition: number[]) => {
  return level[newPosition[0] + 1][newPosition[1] + 1] === PORTAL_CHARACTER
}

export const getRandomAudio = () => {
  const randomIx = Math.floor(Math.random() * musicList.length)
  return musicList[randomIx]
}
