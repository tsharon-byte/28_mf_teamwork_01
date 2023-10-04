import { TLevel, TPosition, TDirectionVector } from '../../../../types'
import { WALL_CHARACTER, BRICK_CHARACTER } from '../../../../../utils/animation/constants'

const noCollision = (level: TLevel, position: TPosition, directionVector: TDirectionVector, canGoThroughWals: boolean) => {
    const [dx, dy] = directionVector
    const [x, y] = position
    const tailCharacter = level[dy > 0 ? Math.ceil(y) : Math.floor(y)][dx > 0 ? Math.ceil(x) : Math.floor(x)]
    return (tailCharacter !== BRICK_CHARACTER || canGoThroughWals) && tailCharacter !== WALL_CHARACTER
}

export default noCollision
