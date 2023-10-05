import Sprite from '../../../utils/animation/Sprite'
import { TLevel, TPosition } from '../../types'
import { BOX_SIZE } from '../../../utils/animation/helpers'
import { ISpriteConstant } from './types'

const createSprite = (
  context: CanvasRenderingContext2D,
  level: TLevel,
  position: TPosition,
  spriteConstant: ISpriteConstant
) => {
  const [x, y] = position
  const { PATH, TAILS_NUMBER, TAIL_SIZE, ANIMATION_SPEED } = spriteConstant
  return new Sprite({
    ctx: context,
    spritePath: PATH,
    width: TAILS_NUMBER * TAIL_SIZE,
    height: TAIL_SIZE,
    numberOfFrames: TAILS_NUMBER,
    ticksPerFrame: ANIMATION_SPEED,
    size: BOX_SIZE,
    x0: x,
    y0: y,
    level,
  })
}

export default createSprite
