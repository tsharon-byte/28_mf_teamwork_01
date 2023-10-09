import { Entity, Vector } from '../../core'
import { TBombAction, BombAction } from './types'
import { TActionSpriteConstantsMap, TLevel } from '../../types'
import { PLANT_SPRITE, BOMB_TIMER } from './constants'
import { BurstWave, BurstWaveStart, BurstWaveMiddle, BurstWaveEnd } from '../burst-waves'
import { DIRECTION_VECTORS } from '../../constants'
import { Direction } from '../../types'
import { BurstWaveMiddleAction } from '../burst-waves/burst-wave-middle/types'
import { BurstWaveEndAction } from '../burst-waves/burst-wave-end/types'
import eventBus from '../../core/event-bus'
import { GameEvent } from '../../types'

class Bomb extends Entity<TBombAction> {
    burstWaves: BurstWave[] = []

    constructor(context: CanvasRenderingContext2D, level: TLevel, position: Vector) {
        const actionSpriteConstants: TActionSpriteConstantsMap<TBombAction> = {
          [BombAction.Plant]: PLANT_SPRITE,
        }
        super(context, level, position, actionSpriteConstants, BombAction.Plant)
    }

    stop() {
        super.stop()
        eventBus.emit(GameEvent.BombExploded, this)
    }

    start() {
        super.start()
        setTimeout(this.stop.bind(this), BOMB_TIMER)
    }
}

export default Bomb
