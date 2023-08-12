class MockedHeroSprite {}
class MockedSprite {}

import {
  drawBomber,
  drawSprite,
  noCollision,
  portalIsFound,
  getRandomAudio,
} from './helpers'

jest.mock('./HeroSprite', () => ({
  default: MockedHeroSprite,
}))

jest.mock('./Sprite', () => ({
  default: MockedSprite,
}))

const getContextMock = jest.fn()
jest
  .spyOn(HTMLCanvasElement.prototype, 'getContext')
  .mockImplementation(getContextMock)

const level = [
  '###############################',
  '#p     ** *  1 * 2 *  * * *   #',
  '# # # #*# # #*#*# # # #*#*#*# #',
  '#  x*     ***  *  1   * 2 * * #',
  '# # # # # #*# # #*#*# # # # #*#',
  '#f         x **  *  *   1     #',
  '# # # # # # # # # #*# #*# # # #',
  '#*  *      *  *      *        #',
  '# # # # #*# # # #*#*# # # # # #',
  '#*    **  *       *           #',
  '# #*# # # # # # #*# # # # # # #',
  '#           *   *  *          #',
  '###############################',
]

describe('test drawBomber helper', () => {
  it('should return HeroSprite instance', () => {
    const ctx = document
      .createElement('canvas')
      .getContext('2d') as CanvasRenderingContext2D
    const src = ''
    const setLevel = jest.fn()
    const x0 = 0
    const y0 = 0
    const setCurrentPos = jest.fn()

    const instance = drawBomber(
      ctx,
      src,
      level,
      setLevel,
      x0,
      y0,
      setCurrentPos
    )

    expect(instance).toBeInstanceOf(MockedHeroSprite)
  })
})

describe('test drawSprite helper', () => {
  it('should return Sprite instance', () => {
    const ctx = document
      .createElement('canvas')
      .getContext('2d') as CanvasRenderingContext2D
    const src = ''

    const instance = drawSprite(ctx, src)

    expect(instance).toBeInstanceOf(MockedSprite)
  })
})

describe('test noCollision helper', () => {
  it('should return false when position match enemy', () => {
    const newPosition = [0, 12]

    const actual = noCollision(level, newPosition)

    expect(actual).toBeFalsy()
  })

  it('should return false when position match wall', () => {
    const newPosition = [1, 1]

    const actual = noCollision(level, newPosition)

    expect(actual).toBeFalsy()
  })

  it('should return false when position match brick', () => {
    const newPosition = [1, 6]

    const actual = noCollision(level, newPosition)

    expect(actual).toBeFalsy()
  })

  it('should return true in start position', () => {
    const newPosition = [0, 0]

    const actual = noCollision(level, newPosition)

    expect(actual).toBeTruthy()
  })

  it('should return true when position match portal', () => {
    const newPosition = [2, 2]

    const actual = noCollision(level, newPosition)

    expect(actual).toBeTruthy()
  })

  it('should return true when position match space', () => {
    const newPosition = [0, 1]

    const actual = noCollision(level, newPosition)

    expect(actual).toBeTruthy()
  })
})

describe('test portalIsFound helper', () => {
  it('should return false when position match enemy', () => {
    const newPosition = [0, 12]

    const actual = portalIsFound(level, newPosition)

    expect(actual).toBeFalsy()
  })

  it('should return false when position match wall', () => {
    const newPosition = [1, 1]

    const actual = portalIsFound(level, newPosition)

    expect(actual).toBeFalsy()
  })

  it('should return false when position match brick', () => {
    const newPosition = [1, 6]

    const actual = portalIsFound(level, newPosition)

    expect(actual).toBeFalsy()
  })

  it('should return false in start position', () => {
    const newPosition = [0, 0]

    const actual = portalIsFound(level, newPosition)

    expect(actual).toBeFalsy()
  })

  it('should return true when position match portal', () => {
    const newPosition = [2, 2]

    const actual = portalIsFound(level, newPosition)

    expect(actual).toBeTruthy()
  })

  it('should return false when position match space', () => {
    const newPosition = [0, 1]

    const actual = portalIsFound(level, newPosition)

    expect(actual).toBeFalsy()
  })
})

describe('test portalIsFound helper', () => {
  it('should return false when position match enemy', () => {
    const mockedRandom = jest.fn(() => 0.2)
    jest.spyOn(Math, 'random').mockImplementation(mockedRandom)

    const actual = getRandomAudio()

    expect(actual).toBe('audio/bomberman.mp3')
  })

  it('should return false when position match enemy', () => {
    const mockedRandom = jest.fn(() => 0.8)
    jest.spyOn(Math, 'random').mockImplementation(mockedRandom)

    const actual = getRandomAudio()

    expect(actual).toBe('audio/Darkman007_2021_Metaltoads_01_Title_Theme.mp3')
  })
})
