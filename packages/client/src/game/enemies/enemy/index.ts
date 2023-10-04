import { POSITION, SPEED, POINTS_PER_KILL, CAN_GO_THROUGH_WALLS } from './constants'
import { DIRECTION_VECTORS } from '../../constants'
import { TLevel, TPosition, TDirection, Direction } from '../../types'
import { createEnemySprites, randomEnumValue, noCollision, roundToDecimal } from './helpers'
import { TActionSprite, TActionSpriteConstant } from './types'
import { Nullable } from '../../../types'
import Sprite from '../../../utils/animation/Sprite'

class Enemy {
    protected _sprites: TActionSprite
    protected _direction: TDirection = randomEnumValue(Direction)
    protected _sprite: Nullable<Sprite> = null
    protected _timer = 0
    protected _animationFrameId: Nullable<number> = null

    constructor(
        protected _context: CanvasRenderingContext2D,
        protected _level: TLevel,
        protected _startPosition: TPosition = POSITION,
        protected _actionSpriteConstants: TActionSpriteConstant,
        protected _speed: number = SPEED,
        protected _pointsPerKill: number = POINTS_PER_KILL,
        protected _canGoThroughWalls: boolean = CAN_GO_THROUGH_WALLS,
    ) {
        this._sprites = createEnemySprites(_context, _level, _startPosition, _actionSpriteConstants)
        this._sprite = this._sprites[this._direction]
    }

    move() {
        if (this._sprite) {
            const prevDirection = this._direction
            const [x0, y0] = this._startPosition
            const [x1, y1] = this._sprite.delta
            const [x2, y2] = DIRECTION_VECTORS[this._direction]
            const canMove = noCollision(
                this._level,
                [roundToDecimal(x0 + x1 + x2 * 0.1, 1), roundToDecimal(y0 + y1 + y2 * 0.1, 1)],
                DIRECTION_VECTORS[this._direction],
                this._canGoThroughWalls
            )
            if (!canMove) {
                const availableDirections = Object.fromEntries(Object.entries(Direction).filter(([key, _]) => {
                    const [x2, y2] = DIRECTION_VECTORS[key as TDirection]
                    return noCollision(
                        this._level,
                        [roundToDecimal(x0 + x1 + x2 * 0.1, 1), roundToDecimal(y0 + y1 + y2 * 0.1, 1)],
                        DIRECTION_VECTORS[key as TDirection],
                        this._canGoThroughWalls
                    )
                }))
                if (Object.keys(availableDirections).length) {
                    this._direction = randomEnumValue(availableDirections)
                } else {
                    return
                }
            }
            if (prevDirection !== this._direction && this._sprite !== this._sprites[this._direction]) {
                this._sprite.stop()
                this._sprite = this._sprites[this._direction]
                this._sprite.start()
            }
            const [x4, y4] = DIRECTION_VECTORS[this._direction]
            this._sprite.delta = [roundToDecimal(x1 + x4 * 0.1, 1), roundToDecimal(y1 + y4 * 0.1, 1)]
        }
    }

    start() {
        if (!this._animationFrameId) {
            this._animationFrameId = window.requestAnimationFrame(this.tick.bind(this))
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
        this._timer++
        if (this._timer % (Math.ceil(100 / this._speed)) === 0) {
            this.move()
        }
        window.requestAnimationFrame(this.tick.bind(this))
    }
}

export default Enemy
