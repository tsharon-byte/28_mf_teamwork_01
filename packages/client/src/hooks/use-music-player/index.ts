import { getRandomAudio } from '../../utils/animation/helpers'
import axios from 'axios'

const useMusicPlayer = () => {
  const audioContext: AudioContext = new AudioContext()
  let audioBuffer: AudioBuffer, source: AudioBufferSourceNode, destination

  const loadSoundFile = async (url: string) => {
    const res = await axios.get(url, {
      responseType: 'arraybuffer',
    })

    audioBuffer = await audioContext.decodeAudioData(res.data)
  }

  const playMusic = function () {
    source = audioContext.createBufferSource()

    source.buffer = audioBuffer

    destination = audioContext.destination

    source.connect(destination)

    source.start()
  }

  // функция остановки воспроизведения
  const stopMusic = function () {
    source.stop()
  }

  loadSoundFile(getRandomAudio())

  return [playMusic, stopMusic]
}

export default useMusicPlayer
