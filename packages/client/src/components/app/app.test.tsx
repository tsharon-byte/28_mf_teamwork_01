import App from '.'
import { render, screen } from '@testing-library/react'

const appContent = 'BOMBERMAN'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<App />)
  expect(screen.getByText(appContent)).toBeDefined()
})