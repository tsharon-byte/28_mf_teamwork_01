import {
  SPEED,
  POINTS_PER_KILL,
  CAN_GO_THROUGH_WALLS,
  POSITION,
} from './constants'
import { DIRECTION_VECTORS } from '../../constants'
import {
  TLevel,
  TDirection,
  Direction,
  GameEvent,
  TPosition,
  DeathAction,
} from '../../types'
import {
  randomEnumValue,
  noCollision,
} from './helpers'
import { Nullable } from '../../../types'
import eventBus from '../../core/event-bus'
import { Vector, Entity } from '../../core'
import { TActionSpriteConstantsMap } from '../../types'
import { roundToDecimal, getMoveAction } from '../../helpers'
import { TEnemyAction } from './types'

class Enemy extends Entity<TEnemyAction> {
  protected _direction: TDirection
  protected _timer = 0
  protected _animationFrameId: Nullable<number> = null
  protected _isDead = false

  constructor(
    context: CanvasRenderingContext2D,
    level: TLevel,
    startPosition: TPosition = POSITION,
    actionSpriteConstantsMap: TActionSpriteConstantsMap<TEnemyAction>,
    protected _speed: number = SPEED,
    protected _pointsPerKill: number = POINTS_PER_KILL,
    protected _canGoThroughWalls: boolean = CAN_GO_THROUGH_WALLS
  ) {
    const position = new Vector(...startPosition)
    const direction = randomEnumValue(Direction)
    const action = getMoveAction(direction)
    super(context, level, position, actionSpriteConstantsMap, action)
    this._direction = direction
  }

  move() {
    if (this._sprite) {
      const prevDirection = this._direction
      const directionVector = DIRECTION_VECTORS[this._direction]
      const positionVector = this._position.add(directionVector.mul(0.1)).roundToDecimal(1)
      const canMove = noCollision(
        this._level,
        directionVector,
        positionVector,
        this._canGoThroughWalls
      )
      if (!canMove) {
        const availableDirections = Object.fromEntries(
          Object.entries(Direction).filter(([key, _]) => {
            const directionVector = DIRECTION_VECTORS[key as TDirection]
            const positionVector = this._position.add(directionVector.mul(0.1)).roundToDecimal(1)
            return noCollision(
              this._level,
              directionVector,
              positionVector,
              this._canGoThroughWalls
            )
          })
        )
        if (Object.keys(availableDirections).length) {
          this._direction = randomEnumValue(availableDirections)
        } else {
          return
        }
      }
      const action = getMoveAction(this._direction)
      if (
        prevDirection !== this._direction &&
        this._sprite !== this._actionSpriteMap[action]
      ) {
        this._sprite.stop()
        this._sprite = this._actionSpriteMap[action]
        this._sprite.start()
      }
      const [x, y] = this._sprite.delta
      const delta = DIRECTION_VECTORS[this._direction].mul(0.1)
      Object.values(this._actionSpriteMap).forEach(sprite => {
        sprite.delta = [
          roundToDecimal(x + delta.x, 1),
          roundToDecimal(y + delta.y, 1),
        ]
      })
      this._position = this._position.add(delta).roundToDecimal(1)
      eventBus.emit(GameEvent.EnemyMove, this)
    }
  }

  start() {
    if (!this._animationFrameId) {
      this._animationFrameId = window.requestAnimationFrame(
        this.tick.bind(this)
      )
    }
    this._sprite?.start?.()
  }

  stop() {
    if (this._animationFrameId) {
      window.cancelAnimationFrame(this._animationFrameId)
      this._animationFrameId = null
    }
  }

  tick() {
    if (this._animationFrameId) {
      this._timer++
      if (this._timer % Math.ceil(100 / this._speed) === 0) {
        this.move()
      }
      window.requestAnimationFrame(this.tick.bind(this))
    }
  }

  dead() {
    if (!this._isDead) {
      this._isDead = true
      this.stop()
      if (this._sprite) {
        this._sprite.stop()
        this._actionSpriteMap[DeathAction.Death].delta = this._sprite.delta
      }
      this._sprite = this._actionSpriteMap[DeathAction.Death]
      this._sprite.onlyOneCycle = true
      this._sprite.start()
    }
  }
}

export default Enemy
