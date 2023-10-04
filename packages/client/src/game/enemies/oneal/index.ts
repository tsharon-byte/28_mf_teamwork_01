import Enemy from '../enemy'
import { TLevel, TPosition } from '../../types'
import { TActionSpriteConstant } from '../enemy/types'
import {
    MOVE_RIGHT_UP_SPRITE,
    MOVE_LEFT_DOWN_SPRITE,
    DEAD_SPRITE,
    SPEED,
    POINTS_PER_KILL,
    CAN_GO_THROUGH_WALLS
} from './constants'

class Oneal extends Enemy {
    constructor(context: CanvasRenderingContext2D, level: TLevel, startPosition: TPosition) {
        const actionSpriteConstants: TActionSpriteConstant = {
            up: MOVE_RIGHT_UP_SPRITE,
            down: MOVE_LEFT_DOWN_SPRITE,
            left: MOVE_LEFT_DOWN_SPRITE,
            right: MOVE_RIGHT_UP_SPRITE,
            dead: DEAD_SPRITE
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

export default Oneal
