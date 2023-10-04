import { createSprite } from '../../../../helpers'
import { TLevel, TPosition } from '../../../../types'
import { TActionSprite, TActionSpriteConstant } from '../../types'

const createEnemySprites = (
  context: CanvasRenderingContext2D,
  level: TLevel,
  position: TPosition,
  actionSpriteConstants: TActionSpriteConstant
) =>
  Object.fromEntries(
    Object.entries(actionSpriteConstants).map(([action, spriteConstant]) => [
      action,
      createSprite(context, level, position, spriteConstant),
    ])
  ) as TActionSprite

export default createEnemySprites
