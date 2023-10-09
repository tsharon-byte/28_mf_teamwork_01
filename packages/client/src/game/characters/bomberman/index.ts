import {
  TDirection,
  TLevel,
  Direction,
  MoveAction,
  DeathAction,
  TurnAction,
  TActionSpriteConstantsMap,
} from '../../types'
import { Entity, Vector } from '../../core'
import {
  TURN_FACE_SPRITE,
  TURN_BACK_SPRITE,
  TURN_LEFT_SPRITE,
  TURN_RIGHT_SPRITE,
  MOVE_UP_SPRITE,
  MOVE_DOWN_SPRITE,
  MOVE_LEFT_SPRITE,
  MOVE_RIGHT_SPRITE,
  DEAD_SPRITE,
  START_POSITION,
  SPEED,
} from './constants'
import { DIRECTION_VECTORS } from '../../constants'
import { roundToDecimal, getMoveAction } from '../../helpers'
import { TBombermanAction } from './types'
import { noCollision } from '../../enemies/enemy/helpers'
import eventBus from '../../core/event-bus'
import { GameEvent } from '../../types'
import { Bomb } from '../../items'

class Bomberman extends Entity<TBombermanAction> {
  protected _direction: TDirection = Direction.Down
  protected _speed: number = SPEED
  bombs: Bomb[] = []

  constructor(context: CanvasRenderingContext2D, level: TLevel) {
    const actionSpriteConstants: TActionSpriteConstantsMap<TBombermanAction> = {
      [TurnAction.TurnFace]: TURN_FACE_SPRITE,
      [TurnAction.TurnBack]: TURN_BACK_SPRITE,
      [TurnAction.TurnLeft]: TURN_LEFT_SPRITE,
      [TurnAction.TurnRight]: TURN_RIGHT_SPRITE,
      [MoveAction.MoveUp]: MOVE_UP_SPRITE,
      [MoveAction.MoveDown]: MOVE_DOWN_SPRITE,
      [MoveAction.MoveLeft]: MOVE_LEFT_SPRITE,
      [MoveAction.MoveRight]: MOVE_RIGHT_SPRITE,
      [DeathAction.Death]: DEAD_SPRITE,
    }
    const [x0, y0] = START_POSITION
    const position = new Vector(x0, y0)
    super(context, level, position, actionSpriteConstants, TurnAction.TurnFace)
  }

  plantBomb() {
    const bomb = new Bomb(this._context, this._level, this.position.round())
    this.bombs.push(bomb)
    bomb.start()
  }

  move() {
    let sprite
    const directionVector = DIRECTION_VECTORS[this._direction]
    const positionVector = this._position
      .add(directionVector.mul(0.1))
      .roundToDecimal(1)
    if (noCollision(this._level, directionVector, positionVector, false)) {
      if (
        !directionVector.x &&
        Math.round(positionVector.x) !== positionVector.x
      ) {
        this._position = new Vector(
          roundToDecimal(
            Math.round(positionVector.x) < positionVector.x
              ? positionVector.x - 0.1
              : positionVector.x + 0.1,
            1
          ),
          this._position.y
        )
        sprite =
          this._actionSpriteMap[
            Math.round(positionVector.x) < positionVector.x
              ? MoveAction.MoveLeft
              : MoveAction.MoveRight
          ]
        if (this._sprite !== sprite) {
          this._sprite.stop()
        }
        const [x, y] = this._sprite.delta
        Object.values(this._actionSpriteMap).forEach(sprite => {
          sprite.delta = [
            roundToDecimal(
              Math.round(positionVector.x) < positionVector.x
                ? x - 0.1
                : x + 0.1,
              1
            ),
            y,
          ]
        })
      } else if (
        !directionVector.y &&
        Math.round(positionVector.y) !== positionVector.y
      ) {
        this._position = new Vector(
          this._position.x,
          roundToDecimal(
            Math.round(positionVector.y) < positionVector.y
              ? positionVector.y - 0.1
              : positionVector.y + 0.1,
            1
          )
        )
        sprite =
          this._actionSpriteMap[
            Math.round(positionVector.y) < positionVector.y
              ? MoveAction.MoveUp
              : MoveAction.MoveDown
          ]
        if (this._sprite !== sprite) {
          this._sprite.stop()
        }
        const [x, y] = this._sprite.delta
        Object.values(this._actionSpriteMap).forEach(sprite => {
          sprite.delta = [
            x,
            roundToDecimal(
              Math.round(positionVector.y) < positionVector.y
                ? y - 0.1
                : y + 0.1,
              1
            ),
          ]
        })
      } else {
        this._position = positionVector
        const [x, y] = this._sprite.delta
        const delta = DIRECTION_VECTORS[this._direction].mul(0.1)
        Object.values(this._actionSpriteMap).forEach(sprite => {
          sprite.delta = [
            roundToDecimal(x + delta.x, 1),
            roundToDecimal(y + delta.y, 1),
          ]
        })
        const action = getMoveAction(this._direction)
        sprite = this._actionSpriteMap[action]
        if (this._sprite !== sprite) {
          this._sprite.stop()
        }
      }
      eventBus.emit(GameEvent.BombermanMove)
    }
    if (this._sprite !== sprite && sprite) {
      this._sprite = sprite
      this._sprite.start()
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const { key } = event
    if (
      [
        'Up',
        'ArrowUp',
        'Down',
        'ArrowDown',
        'Right',
        'ArrowRight',
        'Left',
        'ArrowLeft',
      ].includes(key)
    ) {
      if (['Up', 'ArrowUp'].includes(key)) {
        this._direction = Direction.Up
      }
      if (['Down', 'ArrowDown'].includes(key)) {
        this._direction = Direction.Down
      }
      if (['Right', 'ArrowRight'].includes(key)) {
        this._direction = Direction.Right
      }
      if (['Left', 'ArrowLeft'].includes(key)) {
        this._direction = Direction.Left
      }
      for (let i = 0; i < this._speed; i++) {
        this.move()
      }
    }
    if (key === ' ') {
      this.plantBomb()
    }
  }

  handleKeyUp(event: KeyboardEvent) {
    const { key } = event
    if (
      [
        'Up',
        'ArrowUp',
        'Down',
        'ArrowDown',
        'Right',
        'ArrowRight',
        'Left',
        'ArrowLeft',
      ].includes(key)
    ) {
      this._sprite.stop()
      if (['Up', 'ArrowUp'].includes(key)) {
        this._sprite = this._actionSpriteMap[TurnAction.TurnBack]
      }
      if (['Down', 'ArrowDown'].includes(key)) {
        this._sprite = this._actionSpriteMap[TurnAction.TurnFace]
      }
      if (['Right', 'ArrowRight'].includes(key)) {
        this._sprite = this._actionSpriteMap[TurnAction.TurnRight]
      }
      if (['Left', 'ArrowLeft'].includes(key)) {
        this._sprite = this._actionSpriteMap[TurnAction.TurnLeft]
      }
      this._sprite.start()
    }
  }

  start() {
    super.start()
    this._sprite.render()
    document.addEventListener('keydown', this.handleKeyDown.bind(this), false)
    document.addEventListener('keyup', this.handleKeyUp.bind(this), false)
  }

  stop() {
    super.stop()
    document.removeEventListener('keydown', this.handleKeyDown.bind(this))
    document.removeEventListener('keyup', this.handleKeyUp.bind(this))
  }
}

export default Bomberman
