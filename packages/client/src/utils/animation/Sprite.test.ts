const mockedDrawGrassFunction = jest.fn()

import Sprite from './Sprite'

jest.mock('./helpers', () => ({
  drawGrass: mockedDrawGrassFunction,
}))

class MockedSprite extends Sprite {
  constructor() {
    super({} as any)
  }

  get _started() {
    return this.started
  }

  get _requestId() {
    return this.requestId
  }

  get _tickCount() {
    return this.tickCount
  }

  get _frameIndex() {
    return this.frameIndex
  }
}

const mockedRequestAnimationFrame = jest.fn(() => 42)

const mockedCancelAnimationFrame = jest.fn()

Object.defineProperty(global, 'window', {
  value: {
    requestAnimationFrame: mockedRequestAnimationFrame,
    cancelAnimationFrame: mockedCancelAnimationFrame,
  },
})

describe('test Sprite class', () => {
  describe('start method tests', () => {
    const mockedLoopMethod = jest.fn()

    class CustomMockedSprite extends MockedSprite {
      protected started = false
      protected requestId: number | undefined = undefined

      loop = mockedLoopMethod
    }

    let sprite: CustomMockedSprite

    beforeAll(() => {
      sprite = new CustomMockedSprite()
      sprite.start()
    })

    it('should set started to true', () => {
      expect(sprite._started).toBeTruthy()
    })

    it('should request animation frame', () => {
      expect(mockedRequestAnimationFrame).toBeCalled()
    })

    it('should call request animation frame with loop callback', () => {
      expect(mockedRequestAnimationFrame).toHaveBeenCalledWith(mockedLoopMethod)
    })

    it('should set animation frame id', () => {
      expect(sprite._requestId).toBeDefined()
    })
  })

  describe('stop method tests', () => {
    class CustomMockedSprite extends MockedSprite {
      protected started = true
      protected requestId: number | undefined = 42
    }

    let sprite: CustomMockedSprite

    beforeAll(() => {
      sprite = new CustomMockedSprite()
      sprite.stop()
    })

    it('should set started to false', () => {
      expect(sprite._started).toBeFalsy()
    })

    it('should cancel animation frame', () => {
      expect(mockedCancelAnimationFrame).toBeCalled()
    })

    it('should reset animation frame id', () => {
      expect(sprite._requestId).toBeUndefined()
    })
  })

  describe('loop method tests', () => {
    const mockedUpdateMethod = jest.fn()
    const mockedRenderMethod = jest.fn()
    class CustomMockedSprite extends MockedSprite {
      protected started = true
      update = mockedUpdateMethod
      render = mockedRenderMethod
    }
    let sprite: CustomMockedSprite

    beforeAll(() => {
      mockedRequestAnimationFrame.mockRestore()
      sprite = new CustomMockedSprite()
      sprite.loop()
    })

    it('should call update method', () => {
      expect(mockedUpdateMethod).toBeCalled()
    })

    it('should call render method', () => {
      expect(mockedRenderMethod).toBeCalled()
    })

    it('should request animation frame', () => {
      expect(mockedRequestAnimationFrame).toBeCalled()
    })

    it('should call request animation frame with loop callback', () => {
      expect(mockedRequestAnimationFrame).toBeCalledWith(sprite.loop)
    })
  })

  describe('update method tests', () => {
    class CustomMockedSprite extends MockedSprite {
      protected tickCount = 0
      protected ticksPerFrame = 2
      protected frameIndex = 0
      protected numberOfFrames = 2
    }
    let sprite: CustomMockedSprite

    beforeAll(() => {
      sprite = new CustomMockedSprite()
    })

    it('should set tick count 1', () => {
      sprite.update()
      expect(sprite._tickCount).toBe(1)
    })

    it('should set tick count 0', () => {
      sprite.update()
      sprite.update()
      expect(sprite._tickCount).toBe(0)
    })

    it('should set frame index 1', () => {
      sprite.update()
      sprite.update()
      expect(sprite._frameIndex).toBe(1)
    })

    it('should set frame index 0', () => {
      sprite.update()
      sprite.update()
      sprite.update()
      expect(sprite._frameIndex).toBe(0)
    })
  })

  describe('render method tests', () => {
    const mockedDrawImageFunction = jest.fn()
    class CustomMockedSprite extends MockedSprite {
      protected readonly ctx = {
        drawImage: mockedDrawImageFunction,
      } as any
    }
    let sprite: CustomMockedSprite

    beforeAll(() => {
      sprite = new CustomMockedSprite()
      sprite.render()
    })

    it('should be called once drawGrass function', () => {
      expect(mockedDrawGrassFunction).toBeCalledTimes(1)
    })

    it('should be called once drawImage method', () => {
      expect(mockedDrawImageFunction).toBeCalledTimes(1)
    })
  })
})
