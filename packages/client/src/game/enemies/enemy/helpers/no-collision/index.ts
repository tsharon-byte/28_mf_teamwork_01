import { TLevel } from '../../../../types'
import {
  WALL_CHARACTER,
  BRICK_CHARACTER,
} from '../../../../../utils/animation/constants'
import { Vector } from '../../../../core'

const noCollision = (
  level: TLevel,
  directionVector: Vector,
  positionVector: Vector,
  canGoThroughWals: boolean
) => {
  let x = positionVector.x
  let y = positionVector.y
  if (directionVector.x > 0) {
    x = Math.ceil(x)
  }
  if (directionVector.x < 0) {
    x = Math.floor(x)
  }
  if (directionVector.x == 0) {
    x = Math.round(x)
  }
  if (directionVector.y > 0) {
    y = Math.ceil(y)
  }
  if (directionVector.y < 0) {
    y = Math.floor(y)
  }
  if (directionVector.y == 0) {
    y = Math.round(y)
  }
  const tailCharacter = level[y][x]
  return (
    tailCharacter !== BRICK_CHARACTER ||
    canGoThroughWals
  ) && tailCharacter !== WALL_CHARACTER
}

export default noCollision
