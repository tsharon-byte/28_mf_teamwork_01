import Sprite from './Sprite'
import { FRAME_HEIGHT } from './constants'

class HeroSprite extends Sprite {
  constructor(props: SpriteOptions) {
    super(props)
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.sy = FRAME_HEIGHT * 3
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.sy = FRAME_HEIGHT
    } else if (e.key === 'Up' || e.key === 'ArrowUp') {
      this.sy = FRAME_HEIGHT * 2
    } else if (e.key === 'Down' || e.key === 'ArrowDown') {
      this.sy = 0
    }
  }

  start() {
    super.start()
    document.addEventListener('keydown', this.handleKeyDown, false)
  }

  stop() {
    super.stop()
    document.removeEventListener('keydown', this.handleKeyDown)
  }
}

export default HeroSprite
