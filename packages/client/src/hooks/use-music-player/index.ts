import { getRandomAudio } from '../../utils/animation/helpers'
import { toast } from 'react-toastify'
import { useCallback } from 'react'

const useMusicPlayer = () => {
  const audioContext: AudioContext = new AudioContext()
  let audioBuffer: AudioBuffer, source: AudioBufferSourceNode

  const loadSoundFile = useCallback((url: string) => {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'
    request.onload = () => {
      audioContext.decodeAudioData(
        request.response,
        response => {
          audioBuffer = response
        },
        function () {
          toast.error('Не получилось загрузить аудио- файл')
        }
      )
    }
    request.send()
  }, [])

  const playMusic = useCallback(() => {
    const gainNode = audioContext.createGain()
    gainNode.gain.value = 0.1 // setting it to 10%
    gainNode.connect(audioContext.destination)
    source = audioContext.createBufferSource()

    source.buffer = audioBuffer

    source.connect(gainNode)

    source.start()
  }, [])

  const stopMusic = useCallback(() => {
    source.stop()
  }, [])

  loadSoundFile(getRandomAudio())

  return [playMusic, stopMusic]
}

export default useMusicPlayer
