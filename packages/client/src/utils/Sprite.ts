type SpriteOptions = {
  ctx: CanvasRenderingContext2D
  image: CanvasImageSource
  ticksPerFrame: number
  numberOfFrames: number
  width: number
  height: number
  size: number
  background: string
  x0?: number
  y0?: number
}

const FRAME_HEIGHT = 48

class Sprite {
  private ctx: CanvasRenderingContext2D
  private readonly image: CanvasImageSource
  private frameIndex: number
  private tickCount: number
  private readonly ticksPerFrame: number
  private readonly numberOfFrames: number
  private readonly width: number
  private readonly height: number
  private requestId: number | undefined
  private started: boolean
  private readonly size: number
  private readonly background: string
  private readonly x0: number
  private readonly y0: number
  private sy: number

  constructor(options: SpriteOptions) {
    this.ctx = options.ctx

    this.image = options.image

    this.frameIndex = 0
    this.tickCount = 0
    this.ticksPerFrame = options.ticksPerFrame || 0
    this.numberOfFrames = options.numberOfFrames || 1

    this.width = options.width
    this.height = options.height
    this.requestId = undefined
    this.started = false
    this.size = options.size
    this.x0 = options.x0 || 0
    this.y0 = options.y0 || 0
    this.sy = 0
    this.background = options.background
    this.loop = this.loop.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  update = () => {
    this.tickCount++

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++
      } else {
        this.frameIndex = 0
      }
    }
  }

  render = () => {
    this.ctx.fillStyle = this.background
    this.ctx.fillRect(
      this.size + this.x0,
      this.size + this.y0,
      this.size,
      this.size
    )
    this.ctx.drawImage(
      this.image,
      (this.frameIndex * this.width) / this.numberOfFrames,
      this.sy,
      this.width / this.numberOfFrames,
      this.height,
      this.size + this.x0,
      this.size + this.y0,
      this.size,
      this.size
    )
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

  loop = () => {
    if (this.started) {
      this.update()
      this.render()
      window.requestAnimationFrame(this.loop)
    }
  }

  start = () => {
    this.started = true
    if (!this.requestId) {
      this.requestId = window.requestAnimationFrame(this.loop)
      document.addEventListener('keydown', this.handleKeyDown, false)
    }
  }

  stop = () => {
    this.started = false
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId)
      this.requestId = undefined
      document.removeEventListener('keydown', this.handleKeyDown)
    }
  }
}

export default Sprite
