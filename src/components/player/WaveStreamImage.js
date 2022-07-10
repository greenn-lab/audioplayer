import { useContext } from 'react'
import { MediaProvider } from './AudioPlayer'
import styled from 'styled-components'
import times from 'lodash/times'

export default _ => {
  const { waveform, pixels } = useContext(MediaProvider)

  return (
    <Waveform
      src={waveform}
      pixels={pixels}
      alt={''}
      style={{ borderRightWidth: pixels }}
    />
  )
}

const svg = pixels => {
  let xml = `<svg xmlns='http://www.w3.org/2000/svg' width='${pixels}' height='15'><g><line stroke='#ccc' x1='${pixels}' y1='0' x2='${pixels}' y2='15'/>`

  const part = pixels / 5
  times(4, i => {
    const x = part * (i + 1)
    xml += `<line stroke='#ddd' x1='${x}' y1='0' x2='${x}' y2='5'/>`
  })

  return (
    'data:image/svg+xml,' +
    encodeURIComponent(xml + '</g></svg>')
      .replace(/%20/g, ' ')
      .replace(/%2F/g, '/')
  )
}

const Waveform = styled.img`
  background-image: url(\"${props => svg(props.pixels)}\");
  background-repeat: repeat-x;
  border-right-color: transparent;
  border-right-style: solid;
  position: relative;
  z-index: 1;
`
