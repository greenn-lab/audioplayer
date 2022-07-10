import { useContext, useMemo } from 'react'

import WaveStreamOverview from './WaveStreamOverview'
import WaveStreamImage from './WaveStreamImage'
import WaveStreamTimeline from './WaveStreamTimeline'

import { MediaProvider } from './AudioPlayer'
import floor from 'lodash/floor'
import styled from 'styled-components'

export default _ => {
  const { time, pixels, duration, range } = useContext(MediaProvider)

  const seconds = floor(time)

  return (
    <WaveStream style={{ marginLeft: time * pixels * -1 }}>
      <WaveStreamOverview />
      <WaveStreamImage />
      {useMemo(
        () => (
          <WaveStreamTimeline
            duration={duration}
            range={range}
            time={time}
            pixels={pixels}
          />
        ),
        [seconds]
      )}
    </WaveStream>
  )
}

const WaveStream = styled.div`
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='1'%3E%3Cg%3E%3Cline stroke='%23f33' x1='5' y1='0' x2='5' y2='1' /%3E%3C/g%3E%3C/svg%3E");
  background-repeat: repeat-y;
  background-position: center center;
  background-attachment: fixed;
  height: 90px;
  margin-top: 20px;
  overflow: auto;
  padding-left: 50%;
  position: relative;
`
