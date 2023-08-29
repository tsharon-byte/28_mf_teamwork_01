import { getRandomAudio } from '../../utils/animation/helpers'

const useMusicPlayer = () => {
  const audioContext: AudioContext = new AudioContext()
  let audioBuffer: AudioBuffer, source: AudioBufferSourceNode, destination

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
          console.error('Request failed.')
        }
      )
    }
    request.send()
  }

  const playMusic = function () {
    source = audioContext.createBufferSource()

    source.buffer = audioBuffer

    destination = audioContext.destination

    source.connect(destination)

    source.start()
  }

  const stopMusic = function () {
    source.stop()
  }

  loadSoundFile(getRandomAudio())

  return [playMusic, stopMusic]
}

export default useMusicPlayer
