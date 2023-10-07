import HeroSprite from '../../../utils/animation/HeroSprite'
import { SPRITE_PATH, SPRITE_WIDTH, SPRITE_HEIGHT, NUMBER_OF_FRAMES, TICKS_PER_FRAME, START_POSITION } from './constants'
import { BOX_SIZE } from '../../../utils/animation/helpers'
import { TLevel } from '../../types'

class Bomberman extends HeroSprite {
    constructor(context: CanvasRenderingContext2D, level: TLevel) {
        const [x0, y0] = START_POSITION
        super({
            ctx: context,
            spritePath: SPRITE_PATH,
            width: SPRITE_WIDTH,
            height: SPRITE_HEIGHT,
            numberOfFrames: NUMBER_OF_FRAMES,
            ticksPerFrame: TICKS_PER_FRAME,
            size: BOX_SIZE,
            level,
            x0,
            y0
        })
    }
}

export default Bomberman
