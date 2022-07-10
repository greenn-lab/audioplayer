import React from 'react'
import times from 'lodash/times'
import floor from 'lodash/floor'
import styled from 'styled-components'

import { time as format } from '../../utils/format'

export default ({ duration, range, time, pixels }) => {
  const elapsed = time * pixels

  const half = range / 2
  const first = elapsed < half ? 0 : floor((elapsed - half) / pixels)
  const ticks = range / pixels
  const limit = (duration + 1) * pixels + half

  return (
    <Timeline>
      {times(ticks + 2, i => {
        const tick = first + i
        const left = half + pixels * tick

        if (left < limit) {
          return (
            <time style={{ left }} key={i}>
              {format(tick)}
            </time>
          )
        }
      })}
    </Timeline>
  )
}

const Timeline = styled.div`
  time {
    color: #aaa;
    font-family: 'Share Tech Mono', monospace;
    font-size: 14px;
    letter-spacing: -1.5px;
    position: absolute;
    text-indent: 4px;
    top: 7px;
  }
`
