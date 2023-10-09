import { Vector } from '../../core'
import { createActionSpriteMap } from '../../helpers'
import type { TLevel, TActionSpriteMap, TActionSpriteConstantsMap } from '../../types'
import type Sprite from '../../../utils/animation/Sprite'

class Entity<TAction extends string> {
    protected _actionSpriteMap: TActionSpriteMap<TAction>
    protected _sprite: Sprite
  
    constructor(
        protected _context: CanvasRenderingContext2D,
        protected _level: TLevel,
        protected _position: Vector,
        protected _actionSpriteConstantsMap: TActionSpriteConstantsMap<TAction>,
        protected _action: TAction
    ) {
        this._actionSpriteMap = createActionSpriteMap(
            _context,
            _level,
            _position,
            _actionSpriteConstantsMap
        )
        this._sprite = this._actionSpriteMap[this._action]
    }

    get position(): Vector {
        return new Vector(
            this._position.x,
            this._position.y
        )
    }

    set position(value: Vector) {
        this._position = new Vector(
            value.x,
            value.y
        )
    }

    start() {
        this._sprite.start()
    }
    
    stop() {
        this._sprite.stop()
    }
}

export default Entity
