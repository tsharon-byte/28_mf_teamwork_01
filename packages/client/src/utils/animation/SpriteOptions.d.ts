type SpriteOptions = {
  ctx: CanvasRenderingContext2D
  image: CanvasImageSource
  ticksPerFrame: number
  numberOfFrames: number
  width: number
  height: number
  size: number
  x0?: number
  y0?: number
  setCurrentPos?: (
    value:
      | ((prevState: [number, number]) => [number, number])
      | [number, number]
  ) => void
}
