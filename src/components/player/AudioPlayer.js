import { createContext, useEffect, useRef, useState } from 'react'
import debounce from 'lodash/debounce'

import WaveStream from './WaveStream'
import shortcuts from '../../events/shortcut'

// TODO: drop
// need for dev
import voice from '../../assets/data/sample_4m.wav.mp3'
import wave0 from '../../assets/data/sample_4m.wav.mp3.0.png'
import wave1 from '../../assets/data/sample_4m.wav.mp3.1.png'
import wave2 from '../../assets/data/sample_4m.wav.mp3.2.png'
import wave3 from '../../assets/data/sample_4m.wav.mp3.3.png'
import wave4 from '../../assets/data/sample_4m.wav.mp3.4.png'
import wave5 from '../../assets/data/sample_4m.wav.mp3.5.png'
import wave6 from '../../assets/data/sample_4m.wav.mp3.6.png'
import wave7 from '../../assets/data/sample_4m.wav.mp3.7.png'

const waves = []
waves.push(wave0)
waves.push(wave1)
waves.push(wave2)
waves.push(wave3)
waves.push(wave4)
waves.push(wave5)
waves.push(wave6)
waves.push(wave7)
// end of need for dev

let streamer = null

export const PIXEL_PER_SECOND = 60

export const MediaProvider = createContext()

export default () => {
  const audio = useRef(null)

  const [range, setRange] = useState(window.innerWidth)
  const [duration, setDuration] = useState(0)
  const [zoom] = useState(0)
  const [time, setTime] = useState(0)
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    if (!window.readyForTranscriber) {
      window.readyForTranscriber = true

      window.addEventListener(
        'resize',
        debounce(() => setRange(window.innerWidth), 500)
      )

      document.addEventListener('keyup', e => shortcuts(e, audio.current))
    }
  })

  return (
    <MediaProvider.Provider
      value={{
        range,
        duration,
        zoom,
        time,
        speed,
        media: audio.current,
        waveform: waves[zoom],
        pixels: 20 * zoom + PIXEL_PER_SECOND // 20 pixels per zoom
      }}
    >
      {duration && <WaveStream />}

      <audio
        controls
        src={voice}
        ref={audio}
        onLoadedData={e => setDuration(e.target.duration)}
        onPlay={e =>
          (streamer = setInterval(() => setTime(e.target.currentTime)))
        }
        onPause={_ => clearInterval(streamer)}
        onSeeked={e => setTime(e.target.currentTime)}
        onRateChange={e => setSpeed(e.target.playbackRate)}
      />
    </MediaProvider.Provider>
  )
}
