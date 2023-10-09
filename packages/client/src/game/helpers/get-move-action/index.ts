import { TDirection, TMoveAction, Direction, MoveAction } from '../../types'

const getMoveAction = (direction: TDirection): TMoveAction => {
    switch(direction) {
        case Direction.Up:
            return MoveAction.MoveUp
        case Direction.Down:
            return MoveAction.MoveDown
        case Direction.Left:
            return MoveAction.MoveLeft
        case Direction.Right:
            return MoveAction.MoveRight
        default:
            throw new Error(`Unknown direction ${direction}`)
    }
}

export default getMoveAction
