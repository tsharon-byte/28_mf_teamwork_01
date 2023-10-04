import type Sprite from '../../../utils/animation/Sprite'
import { ISpriteConstant } from '../../helpers/create-sprite/types'

export enum Action {
    up = 'up',
    down = 'down',
    left = 'left',
    right = 'right',
    dead = 'dead',
}

export type TAction = keyof typeof Action

export type TActionSprite = Record<TAction, Sprite>

export type TActionSpriteConstant = Record<TAction, ISpriteConstant>
