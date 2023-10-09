import { TDirection, Direction } from '../../types'
import { BurstWaveEndAction } from '../../items/burst-waves/burst-wave-end/types'

const getBurstWaveEndAction = (direction: TDirection): BurstWaveEndAction => {
    switch(direction) {
        case Direction.Up:
            return BurstWaveEndAction.BoomUp
        case Direction.Down:
            return BurstWaveEndAction.BoomDown
        case Direction.Left:
            return BurstWaveEndAction.BoomLeft
        case Direction.Right:
            return BurstWaveEndAction.BoomRight
        default:
            throw new Error(`Unknown direction ${direction}`)
    }
}

export default getBurstWaveEndAction
