import { useContext } from 'react'
import { MediaProvider } from './AudioPlayer'
import styled from 'styled-components'

const html = document.documentElement

const drag = {
  aim({ target }) {
    drag.target = target
    html.classList.add('dragging')
    html.addEventListener('mousemove', drag.ing)
    html.addEventListener('mouseup', drag.end)
  },
  ing(e) {
    drag.position = html.offsetWidth > e.clientX ? e.clientX : html.offsetWidth
    drag.target.style.left = `${drag.position}px`

    console.log(drag.position, e.clientX, html.offsetWidth)
  },
  end() {
    html.removeEventListener('mousemove', drag.ing)
    html.removeEventListener('mouseup', drag.end)
    html.classList.remove('dragging')
    drag.position = 0
  },
  target: null,
  position: 0
}

export default _ => {
  const { media, duration, range, time, waveform, pixels } =
    useContext(MediaProvider)

  const limit = pixels * duration
  const width = (range * range) / limit
  const left = drag.position || (time * range) / duration

  return (
    <Overview
      style={{ backgroundImage: `url(${waveform})` }}
      onMouseUp={e => {
        console.warn('mouseup', e.clientX)
        media.currentTime = (e.clientX * duration) / range
      }}
    >
      <CurrentRange
        style={{ left, width, marginLeft: width / -2 }}
        onMouseDown={drag.aim}
      />
    </Overview>
  )
}

const Overview = styled.div`
  background-size: cover;
  height: 20px;
  left: 0;
  opacity: 0.5;
  position: fixed;
  top: 0;
  width: 100%;
`

const CurrentRange = styled.i`
  background-color: #5bb9b280;
  cursor: ew-resize;
  height: 12px;
  position: absolute;
  top: 4px;
`
