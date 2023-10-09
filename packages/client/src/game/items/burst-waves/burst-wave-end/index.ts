import { Vector } from '../../../core'
import { TBurstWaveEndAction, BurstWaveEndAction } from './types'
import { TActionSpriteConstantsMap, TLevel } from '../../../types'
import { BOOM_UP_SPRITE, BOOM_DOWN_SPRITE, BOOM_LEFT_SPRITE, BOOM_RIGHT_SPRITE } from './constants'
import BurstWave from '../burst-wave'

class BurstWaveEnd extends BurstWave<TBurstWaveEndAction> {
    constructor(context: CanvasRenderingContext2D, level: TLevel, position: Vector, action: BurstWaveEndAction) {
        const actionSpriteConstants: TActionSpriteConstantsMap<TBurstWaveEndAction> = {
          [BurstWaveEndAction.BoomUp]: BOOM_UP_SPRITE,
          [BurstWaveEndAction.BoomDown]: BOOM_DOWN_SPRITE,
          [BurstWaveEndAction.BoomLeft]: BOOM_LEFT_SPRITE,
          [BurstWaveEndAction.BoomRight]: BOOM_RIGHT_SPRITE,
        }
        super(context, level, position, actionSpriteConstants, action)
    }
}

export default BurstWaveEnd
