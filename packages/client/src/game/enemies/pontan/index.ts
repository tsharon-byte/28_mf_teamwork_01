import Enemy from '../enemy'
import { TLevel, TPosition } from '../../types'
import { TActionSpriteConstant } from '../enemy/types'
import {
    MOVE_SPRITE,
    DEAD_SPRITE,
    SPEED,
    POINTS_PER_KILL,
    CAN_GO_THROUGH_WALLS
} from './constants'

class Pass extends Enemy {
    constructor(context: CanvasRenderingContext2D, level: TLevel, startPosition: TPosition) {
        const actionSpriteConstants: TActionSpriteConstant = {
            up: MOVE_SPRITE,
            down: MOVE_SPRITE,
            left: MOVE_SPRITE,
            right: MOVE_SPRITE,
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

export default Pass
