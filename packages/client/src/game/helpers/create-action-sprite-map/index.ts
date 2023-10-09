import createSprite from '../create-sprite'
import type { TLevel, TActionSpriteConstantsMap, TActionSpriteMap, ISpriteConstants } from '../../types'
import type { Vector } from '../../core'

const createActionSpriteMap = <TAction extends string>(
  context: CanvasRenderingContext2D,
  level: TLevel,
  position: Vector,
  actionSpriteConstantsMap: TActionSpriteConstantsMap<TAction>
) =>
  Object.fromEntries(
    Object.entries<ISpriteConstants>(actionSpriteConstantsMap).map(([action, spriteConstants]) => [
      action,
      createSprite(context, level, position, spriteConstants),
    ])
  ) as TActionSpriteMap<TAction>

export default createActionSpriteMap
