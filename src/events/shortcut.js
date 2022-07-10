const shiftWith = (key, audio) => {
  console.debug(`Pressed "Shift" with "${key}" key for shortcut.`)

  // play or pause
  if (key === ' ') audio.paused ? audio.play() : audio.pause()

  // speed up
  if (key === '>' && audio.playbackRate < 4)
    audio.playbackRate = audio.playbackRate + 0.5

  // speed down
  if (key === '<' && audio.playbackRate > 0.5)
    audio.playbackRate = audio.playbackRate - 0.5
}

export default ({ shiftKey, key }, audio) => {
  if (shiftKey) {
    shiftWith(key, audio)
  }
}
