import Sprite from '../../../utils/animation/Sprite'
import { BOX_SIZE } from '../../../utils/animation/helpers'
import type { TLevel, ISpriteConstants } from '../../types'
import type { Vector } from '../../core'

const createSprite = (
  context: CanvasRenderingContext2D,
  level: TLevel,
  position: Vector,
  spriteConstants: ISpriteConstants
) => {
  const { PATH, TAILS_NUMBER, TAIL_SIZE, ANIMATION_SPEED } = spriteConstants
  return new Sprite({
    ctx: context,
    spritePath: PATH,
    width: TAILS_NUMBER * TAIL_SIZE,
    height: TAIL_SIZE,
    numberOfFrames: TAILS_NUMBER,
    ticksPerFrame: ANIMATION_SPEED,
    size: BOX_SIZE,
    x0: position.x,
    y0: position.y,
    level,
  })
}

export default createSprite
