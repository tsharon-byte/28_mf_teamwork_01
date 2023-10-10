import { TDirectionVector } from './types'
import { Vector } from './core'

export const DIRECTION_VECTORS: TDirectionVector = {
  Up: new Vector(0, -1),
  Down: new Vector(0, 1),
  Left: new Vector(-1, 0),
  Right: new Vector(1, 0),
}
