import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Bomberman from './index'

describe('test bomberman component', () => {
  beforeEach(() => {
    window.AudioContext = jest.fn().mockImplementation(() => {
      return {}
    })

    render(<Bomberman />)
  })

  test('should has canvas element', async () => {
    expect(screen.getByTestId('canvas')).toBeInTheDocument()
  })

  test('should has start game button', () => {
    expect(screen.getByText('Начать Игру')).toBeInTheDocument()
  })

  test('should has end game button', () => {
    expect(screen.getByText('Окончить Игру')).toBeInTheDocument()
  })
})
