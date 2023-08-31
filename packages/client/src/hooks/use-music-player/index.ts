import { getRandomAudio } from '../../utils/animation/helpers'
import { toast } from 'react-toastify'

const useMusicPlayer = () => {
  const audioContext: AudioContext = new AudioContext()
  let audioBuffer: AudioBuffer, source: AudioBufferSourceNode

  const loadSoundFile = (url: string) => {
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
  }

  const playMusic = () => {
    source = audioContext.createBufferSource()

    source.buffer = audioBuffer

    const destination = audioContext.destination

    source.connect(destination)

    source.start()
  }

  const stopMusic = () => {
    source.stop()
  }

  loadSoundFile(getRandomAudio())

  return [playMusic, stopMusic]
}

export default useMusicPlayer
