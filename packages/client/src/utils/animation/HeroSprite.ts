import Sprite from './Sprite'
import { FRAME_HEIGHT } from './constants'
import {
  BOX_SIZE,
  drawSprite,
  noCollision,
  portalIsFound,
} from '../../components/bomberman/helpers'

const BOMB_SPRITE = 'img/bomb.png'
const FIRE_SPRITE = 'img/fire.png'
const BOMB_SPRITE_FRAMES = 5
const BOMB_SPRITE_WIDTH = 140
const BOMB_SPRITE_HEIGHT = 28
const FIRE_SPRITE_FRAMES = 6
const FIRE_SPRITE_WIDTH = 228
const FIRE_SPRITE_HEIGHT = 38
const FIRE_TICKS_PER_FRAME = 10

class HeroSprite extends Sprite {
  private _setCurrentPos: any
  private level: string[]
  private setLevel: (
    value: ((prevState: string[]) => string[]) | string[]
  ) => void

  constructor(props: HeroSpriteOptions) {
    super(props)
    this._setCurrentPos = props.setCurrentPos
    this.level = props.level
    this.setLevel = props.setLevel
  }

  drawFlame = (x: number, y: number) => {
    let flame
    if (this.level[y][x] !== '#') {
      flame = drawSprite(
        this.ctx,
        FIRE_SPRITE,
        BOX_SIZE * x,
        BOX_SIZE * y,
        FIRE_SPRITE_FRAMES,
        FIRE_SPRITE_WIDTH,
        FIRE_SPRITE_HEIGHT,
        FIRE_TICKS_PER_FRAME
      )
      flame.start()
      const temp = this.level[y].split('')
      temp[x] = ' '
      this.level[y] = temp.join('')
    }
    return flame
  }

  handleBomb = () => {
    const bomb = drawSprite(
      this.ctx,
      BOMB_SPRITE,
      BOX_SIZE * (this.dx + 1),
      BOX_SIZE * (this.dy + 1),
      BOMB_SPRITE_FRAMES,
      BOMB_SPRITE_WIDTH,
      BOMB_SPRITE_HEIGHT
    )
    bomb.start()
    const bombX = this.dx
    const bombY = this.dy
    setTimeout(() => {
      bomb.stop()
      const flame = drawSprite(
        this.ctx,
        FIRE_SPRITE,
        BOX_SIZE * (bombX + 1),
        BOX_SIZE * (bombY + 1),
        FIRE_SPRITE_FRAMES,
        FIRE_SPRITE_WIDTH,
        FIRE_SPRITE_HEIGHT,
        FIRE_TICKS_PER_FRAME
      )
      flame.start()
      const flame1 = this.drawFlame(bombX, bombY + 1)
      const flame2 = this.drawFlame(bombX + 1, bombY)
      const flame3 = this.drawFlame(bombX + 1, bombY + 2)
      const flame4 = this.drawFlame(bombX + 2, bombY + 1)
      setTimeout(() => {
        flame.stop()
        if (flame1) flame1.stop()
        if (flame2) flame2.stop()
        if (flame3) flame3.stop()
        if (flame4) flame4.stop()
        if (
          (bombX - 1 <= this.dx && bombX + 1 >= this.dx && bombY === this.dy) ||
          (bombY - 1 <= this.dy && bombY + 1 >= this.dy && bombX === this.dx)
        ) {
          alert('game over!')
          window.location.reload()
        }
      }, 2000)
    }, 2000)
  }

  handleKeyDown = (e: KeyboardEvent) => {
    const newPos = [this.dy, this.dx]
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.sy = FRAME_HEIGHT * 3
      newPos[1] += 1
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.sy = FRAME_HEIGHT
      newPos[1] -= 1
    } else if (e.key === 'Up' || e.key === 'ArrowUp') {
      this.sy = FRAME_HEIGHT * 2
      newPos[0] -= 1
    } else if (e.key === 'Down' || e.key === 'ArrowDown') {
      this.sy = 0
      newPos[0] += 1
    } else if (e.key === ' ') {
      this.handleBomb()
    }
    if (portalIsFound(this.level, newPos)) {
      setTimeout(() => {
        alert('Победа!')
        window.location.reload()
      }, 500)
    }
    if (noCollision(this.level, newPos)) {
      ;[this.dy, this.dx] = newPos
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
