import { drawGrass } from './helpers'

class Sprite {
  protected readonly ctx: CanvasRenderingContext2D
  private readonly image: CanvasImageSource
  protected frameIndex: number
  protected tickCount: number
  protected readonly ticksPerFrame: number
  protected readonly numberOfFrames: number
  private readonly width: number
  private readonly height: number
  protected requestId: number | undefined
  protected started: boolean
  private readonly size: number
  private readonly x0: number
  private readonly y0: number
  protected sy: number
  protected dx: number
  protected dy: number

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
    this.dx = 0
    this.dy = 0
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
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
    drawGrass(
      this.ctx,
      this.size + this.x0 + this.dx * this.size,
      this.size + this.y0 + this.dy * this.size
    )
    this.ctx.drawImage(
      this.image,
      (this.frameIndex * this.width) / this.numberOfFrames,
      this.sy,
      this.width / this.numberOfFrames,
      this.height,
      this.size + this.x0 + this.dx * this.size,
      this.size + this.y0 + this.dy * this.size,
      this.size,
      this.size
    )
  }

  loop = () => {
    if (this.started) {
      this.update()
      this.render()
      window.requestAnimationFrame(this.loop)
    }
  }

  start() {
    this.started = true
    if (!this.requestId) {
      this.requestId = window.requestAnimationFrame(this.loop)
    }
  }

  stop() {
    this.started = false
    if (this.requestId) {
      window.cancelAnimationFrame(this.requestId)
      this.requestId = undefined
    }
  }
}

export default Sprite
