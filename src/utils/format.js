const timeFormat = number => Math.floor(number).toString().padStart(2, '0')

export const timeMinuteSecond = seconds => {
  const min = seconds % 3600
  return `${timeFormat(seconds / 60)}:${timeFormat((min % 60) % 60)}`
}

export const time = seconds => {
  return seconds < 3600
    ? timeMinuteSecond(seconds)
    : timeFormat(seconds / 3600) + ':' + timeMinuteSecond(seconds)
}

export const name2rgb = name => {
  if (!name) return null

  const rgb = [0, 0, 0]
  ;(name.length < 3 ? name.padEnd(3, name[name.length - 1]) : name)
    .split('')
    .forEach((c, i) => (rgb[i % 3] += c.charCodeAt(0)))

  console.debug('name', name, rgb)
  return '#' + rgb.map(i => ((i % 127) + 127).toString(16)).join('')
}
