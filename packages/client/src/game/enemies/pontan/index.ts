import Enemy from '../enemy'
import {
  TLevel,
  TPosition,
  TActionSpriteConstantsMap,
  MoveAction,
  DeathAction,
} from '../../types'
import {
  MOVE_SPRITE,
  DEAD_SPRITE,
  SPEED,
  POINTS_PER_KILL,
  CAN_GO_THROUGH_WALLS,
} from './constants'
import { TEnemyAction } from '../enemy/types'

class Pass extends Enemy {
  constructor(
    context: CanvasRenderingContext2D,
    level: TLevel,
    startPosition: TPosition
  ) {
    const actionSpriteConstants: TActionSpriteConstantsMap<TEnemyAction> = {
      [MoveAction.MoveUp]: MOVE_SPRITE,
      [MoveAction.MoveDown]: MOVE_SPRITE,
      [MoveAction.MoveLeft]: MOVE_SPRITE,
      [MoveAction.MoveRight]: MOVE_SPRITE,
      [DeathAction.Death]: DEAD_SPRITE,
    }
    super(
      context,
      level,
      startPosition,
      actionSpriteConstants,
      SPEED,
      POINTS_PER_KILL,
      CAN_GO_THROUGH_WALLS
    )
  }
}

export default Pass
