import { useState } from 'react'

function useFullScreen(initialValue = false): [boolean, () => void] {
  const [fullScreenFlag, setFullScreenFlag] = useState(initialValue)

  function toggleFullScreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
      document.exitFullscreen()
    }
    setFullScreenFlag(!fullScreenFlag)
  }

  return [fullScreenFlag, toggleFullScreen]
}

export default useFullScreen
