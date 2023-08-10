jest.mock('./constants', () => ({
  FRAME_HEIGHT: 48,
  GRASS_CHARACTER: ' ',
  WALL_CHARACTER: '#',
}))

const mockedBombSpriteStartMethod = jest.fn()
const mockedBombSpriteStopMethod = jest.fn()
const mockedFireSpriteStartMethod = jest.fn()
const mockedFireSpriteStopMethod = jest.fn()
const mockedDrawSprite = jest.fn((_, src) => {
  if (src === 'img/bomb.png') {
    return {
      start: mockedBombSpriteStartMethod,
      stop: mockedBombSpriteStopMethod,
    }
  } else if (src === 'img/fire.png') {
    return {
      start: mockedFireSpriteStartMethod,
      stop: mockedFireSpriteStopMethod,
    }
  }
})
const mockedNoCollision = jest.fn(() => true)
const mockedPortalIsFound = jest.fn()

jest.mock('./helpers', () => ({
  drawSprite: mockedDrawSprite,
  noCollision: mockedNoCollision,
  portalIsFound: mockedPortalIsFound,
}))

const mockedAddEventListener = jest.fn()
const mockedRemoveEventListener = jest.fn()

Object.defineProperty(global, 'document', {
  value: {
    addEventListener: mockedAddEventListener,
    removeEventListener: mockedRemoveEventListener,
  },
})

import HeroSprite from './HeroSprite'

class MockedHeroSprite extends HeroSprite {
  constructor() {
    super({} as any)
  }
}

Object.defineProperty(global, 'setTimeout', {
  value: (cb: () => void) => cb(),
})

Object.defineProperty(global, 'alert', {
  value: jest.fn(),
})

Object.defineProperty(global, 'window', {
  value: {
    location: {
      reload: jest.fn(),
    },
    requestAnimationFrame: jest.fn(),
  },
})

describe('test HeroSprite class', () => {
  describe('test start and stop methods', () => {
    const mockedHandleKeyDownMethod = jest.fn()

    class CustomMockedHeroSprite extends MockedHeroSprite {
      handleKeyDown = mockedHandleKeyDownMethod
    }

    let sprite: CustomMockedHeroSprite

    beforeEach(() => {
      jest.restoreAllMocks()
      sprite = new CustomMockedHeroSprite()
    })

    describe('start method tests', () => {
      beforeEach(() => {
        sprite.start()
      })

      it('should add keydown event listener', () => {
        expect(mockedAddEventListener).toHaveBeenCalledWith(
          'keydown',
          mockedHandleKeyDownMethod,
          false
        )
      })
    })

    describe('stop method tests', () => {
      beforeEach(() => {
        sprite.stop()
      })

      it('should remove keydown event listener', () => {
        expect(mockedRemoveEventListener).toHaveBeenCalledWith(
          'keydown',
          mockedHandleKeyDownMethod
        )
      })
    })
  })

  describe('test handleKeyDown method', () => {
    const mockedHandleBomb = jest.fn()

    class CustomMockedHeroSprite extends MockedHeroSprite {
      constructor() {
        super()
        this.dx = 0
        this.dy = 0
        this.sy = 0
      }

      handleBomb = mockedHandleBomb

      get _dx() {
        return this.dx
      }

      get _dy() {
        return this.dy
      }

      get _sy() {
        return this.sy
      }
    }

    let sprite: CustomMockedHeroSprite

    beforeEach(() => {
      jest.restoreAllMocks()
      sprite = new CustomMockedHeroSprite()
    })

    it('should sy to be equal FRAME_HEIGHT * 3 when press right key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Right' })
      sprite.handleKeyDown(event)
      expect(sprite._sy).toBe(144)
    })

    it('should sy to be equal FRAME_HEIGHT * 3 when press arrow right key', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' })
      sprite.handleKeyDown(event)
      expect(sprite._sy).toBe(144)
    })

    it('should increment dx when press right key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Right' })
      sprite.handleKeyDown(event)
      expect(sprite._dx).toBe(1)
    })

    it('should increment dx when press arrow right key', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' })
      sprite.handleKeyDown(event)
      expect(sprite._dx).toBe(1)
    })

    it('should not change dy when press right key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Right' })
      sprite.handleKeyDown(event)
      expect(sprite._dy).toBe(0)
    })

    it('should not change dy when press arrow right key', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' })
      sprite.handleKeyDown(event)
      expect(sprite._dy).toBe(0)
    })

    it('should sy to be equal FRAME_HEIGHT when press left key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Left' })
      sprite.handleKeyDown(event)
      expect(sprite._sy).toBe(48)
    })

    it('should sy to be equal FRAME_HEIGHT when press arrow left key', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
      sprite.handleKeyDown(event)
      expect(sprite._sy).toBe(48)
    })

    it('should decrement dx when press left key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Left' })
      sprite.handleKeyDown(event)
      expect(sprite._dx).toBe(-1)
    })

    it('should decrement dx when press arrow left key', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
      sprite.handleKeyDown(event)
      expect(sprite._dx).toBe(-1)
    })

    it('should not change dy when press left key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Left' })
      sprite.handleKeyDown(event)
      expect(sprite._dy).toBe(0)
    })

    it('should not change dy when press arrow left key', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' })
      sprite.handleKeyDown(event)
      expect(sprite._dy).toBe(0)
    })

    it('should sy to be equal FRAME_HEIGHT * 2 when press up key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Up' })
      sprite.handleKeyDown(event)
      expect(sprite._sy).toBe(96)
    })

    it('should sy to be equal FRAME_HEIGHT * 2 when press arrow up key', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
      sprite.handleKeyDown(event)
      expect(sprite._sy).toBe(96)
    })

    it('should decrement dу when press up key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Up' })
      sprite.handleKeyDown(event)
      expect(sprite._dy).toBe(-1)
    })

    it('should decrement dу when press arrow up key', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
      sprite.handleKeyDown(event)
      expect(sprite._dy).toBe(-1)
    })

    it('should not change dx when press up key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Up' })
      sprite.handleKeyDown(event)
      expect(sprite._dx).toBe(0)
    })

    it('should not change dx when press arrow up key', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' })
      sprite.handleKeyDown(event)
      expect(sprite._dx).toBe(0)
    })

    it('should sy to be equal 0 when press down key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Down' })
      sprite.handleKeyDown(event)
      expect(sprite._sy).toBe(0)
    })

    it('should sy to be equal 0 when press arrow down key', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
      sprite.handleKeyDown(event)
      expect(sprite._sy).toBe(0)
    })

    it('should increment dу when press down key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Down' })
      sprite.handleKeyDown(event)
      expect(sprite._dy).toBe(1)
    })

    it('should increment dу when press arrow down key', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
      sprite.handleKeyDown(event)
      expect(sprite._dy).toBe(1)
    })

    it('should not change dx when press down key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Down' })
      sprite.handleKeyDown(event)
      expect(sprite._dx).toBe(0)
    })

    it('should not change dx when press arrow down key', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
      sprite.handleKeyDown(event)
      expect(sprite._dx).toBe(0)
    })

    it('should placed bomb when press space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' })
      sprite.handleKeyDown(event)
      expect(mockedHandleBomb).toHaveBeenCalledTimes(1)
    })

    describe('', () => {
      beforeEach(() => {
        mockedPortalIsFound.mockRestore()
        mockedNoCollision.mockRestore()
        const event = new KeyboardEvent('keydown')
        sprite.handleKeyDown(event)
      })

      it('should check portalIsFound', () => {
        expect(mockedPortalIsFound).toHaveBeenCalledTimes(1)
      })

      it('should check noCollision', () => {
        expect(mockedNoCollision).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('test handleBomb method', () => {
    const mockedDrawFlame = jest.fn()
    class CustomMockedHeroSprite extends MockedHeroSprite {
      drawFlame = mockedDrawFlame
    }

    let sprite: CustomMockedHeroSprite

    beforeEach(() => {
      mockedBombSpriteStartMethod.mockReset()
      mockedBombSpriteStopMethod.mockReset()
      mockedFireSpriteStartMethod.mockReset()
      mockedFireSpriteStopMethod.mockReset()
      mockedDrawFlame.mockReset()
      sprite = new CustomMockedHeroSprite()
      sprite.handleBomb()
    })

    it('should start bomb sprite', () => {
      expect(mockedBombSpriteStartMethod).toHaveBeenCalledTimes(1)
    })

    it('should stop bomb sprite', () => {
      expect(mockedBombSpriteStopMethod).toHaveBeenCalledTimes(1)
    })

    it('should start fire sprite', () => {
      expect(mockedFireSpriteStartMethod).toHaveBeenCalledTimes(1)
    })

    it('should stop fire sprite', () => {
      expect(mockedFireSpriteStopMethod).toHaveBeenCalledTimes(1)
    })

    it('should draw four flame', () => {
      expect(mockedDrawFlame).toHaveBeenCalledTimes(4)
    })
  })
})
