import { Entity, Vector } from '../../../core'
import { TLevel, TActionSpriteConstantsMap } from '../../../types'
import eventBus from '../../../core/event-bus'
import { GameEvent } from '../../../types'
import { BOOM_TIMER } from './constants'
import { GRASS_CHARACTER } from '../../../../utils/animation/constants'

class BurstWave<TAction extends string = any> extends Entity<TAction> {
    constructor(
        context: CanvasRenderingContext2D,
        level: TLevel,
        position: Vector,
        actionSpriteConstantsMap: TActionSpriteConstantsMap<TAction>,
        action: TAction
    ) {
        super(context, level, position, actionSpriteConstantsMap, action)
    }

    stop() {
        super.stop()
        eventBus.emit(GameEvent.BurstWavePassed, this)
    }

    start() {
        super.start()
        this._sprite.onlyOneCycle = true
        setTimeout(this.stop.bind(this), BOOM_TIMER)
        const temp = this._level[this._position.y].split('')
        temp[this._position.x] = GRASS_CHARACTER
        this._level[this._position.y] = temp.join('')
    }
}

export default BurstWave
