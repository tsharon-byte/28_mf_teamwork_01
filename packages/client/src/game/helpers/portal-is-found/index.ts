import { Vector } from '../../core'
import { TLevel } from '../../types'
import { PORTAL_CHARACTER } from '../../../utils/animation/constants'

const portalIsFound = (level: TLevel, position: Vector) =>
  level[Math.round(position.y)][Math.round(position.x)] === PORTAL_CHARACTER

export default portalIsFound
