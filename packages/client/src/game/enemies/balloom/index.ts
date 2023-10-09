import Enemy from '../enemy'
import {
  TLevel,
  TPosition,
  TActionSpriteConstantsMap,
  MoveAction,
  DeathAction,
} from '../../types'
import {
  MOVE_RIGHT_UP_SPRITE,
  MOVE_LEFT_DOWN_SPRITE,
  DEAD_SPRITE,
  SPEED,
  POINTS_PER_KILL,
  CAN_GO_THROUGH_WALLS,
} from './constants'
import { TEnemyAction } from '../enemy/types'

class Balloom extends Enemy {
  constructor(
    context: CanvasRenderingContext2D,
    level: TLevel,
    startPosition: TPosition
  ) {
    const actionSpriteConstants: TActionSpriteConstantsMap<TEnemyAction> = {
      [MoveAction.MoveUp]: MOVE_RIGHT_UP_SPRITE,
      [MoveAction.MoveDown]: MOVE_LEFT_DOWN_SPRITE,
      [MoveAction.MoveLeft]: MOVE_LEFT_DOWN_SPRITE,
      [MoveAction.MoveRight]: MOVE_RIGHT_UP_SPRITE,
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

export default Balloom
