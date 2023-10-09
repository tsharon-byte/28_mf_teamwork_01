import { Vector } from '../../../core'
import { TBurstWaveStartAction, BurstWaveStartAction } from './types'
import { TActionSpriteConstantsMap, TLevel } from '../../../types'
import { BOOM_SPRITE } from './constants'
import BurstWave from '../burst-wave'

class BurstWaveStart extends BurstWave<TBurstWaveStartAction> {
    constructor(context: CanvasRenderingContext2D, level: TLevel, position: Vector) {
        const actionSpriteConstants: TActionSpriteConstantsMap<TBurstWaveStartAction> = {
          [BurstWaveStartAction.Boom]: BOOM_SPRITE,
        }
        super(context, level, position, actionSpriteConstants, BurstWaveStartAction.Boom)
    }
}

export default BurstWaveStart
