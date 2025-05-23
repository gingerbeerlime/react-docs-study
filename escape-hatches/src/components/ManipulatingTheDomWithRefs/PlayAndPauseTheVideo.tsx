import { useState, useRef } from 'react'
import { Button } from '@/components/common'

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  function handleClick() {
    const nextIsPlaying = !isPlaying
    setIsPlaying(nextIsPlaying)
    if (nextIsPlaying) {
      videoRef.current?.play()
    } else {
      videoRef.current?.pause()
    }
  }

  return (
    <>
      <Button onClick={handleClick}>{isPlaying ? 'Pause' : 'Play'}</Button>
      <video
        width='250'
        ref={videoRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source
          src='https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
          type='video/mp4'
        />
      </video>
    </>
  )
}
