import { Vector } from '../../../core'
import { TBurstWaveMiddleAction, BurstWaveMiddleAction } from './types'
import { TActionSpriteConstantsMap, TLevel } from '../../../types'
import { BOOM_UP_DOWN_SPRITE, BOOM_LEFT_RIGHT_SPRITE } from './constants'
import BurstWave from '../burst-wave'

class BurstWaveMiddle extends BurstWave<TBurstWaveMiddleAction> {
    constructor(context: CanvasRenderingContext2D, level: TLevel, position: Vector, action: BurstWaveMiddleAction) {
        const actionSpriteConstants: TActionSpriteConstantsMap<TBurstWaveMiddleAction> = {
          [BurstWaveMiddleAction.BoomUpDown]: BOOM_UP_DOWN_SPRITE,
          [BurstWaveMiddleAction.BoomLeftRight]: BOOM_LEFT_RIGHT_SPRITE,
        }
        super(context, level, position, actionSpriteConstants, action)
    }
}

export default BurstWaveMiddle
