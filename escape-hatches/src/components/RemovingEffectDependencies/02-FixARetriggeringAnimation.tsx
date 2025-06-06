import { useState, useEffect, useRef } from 'react'
import { experimental_useEffectEvent as useEffectEvent } from 'react'
import { FadeInAnimation } from '../../lib/animation'

function Welcome({ duration }: { duration: number }) {
  const ref = useRef<HTMLElement | null>(null)

  const onStart = useEffectEvent((animation: FadeInAnimation) => {
    animation.start(duration)
  })

  useEffect(() => {
    if (!ref.current) return
    const animation = new FadeInAnimation(ref.current)
    onStart(animation)
    return () => {
      animation.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <h1
      ref={ref}
      style={{
        opacity: 0,
        color: 'white',
        padding: 50,
        textAlign: 'center',
        fontSize: 50,
        backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)',
      }}
    >
      Welcome
    </h1>
  )
}

export default function App() {
  const [duration, setDuration] = useState(1000)
  const [show, setShow] = useState(false)

  return (
    <>
      <label>
        <input
          type='range'
          min='100'
          max='3000'
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
        <br />
        Fade in duration: {duration} ms
      </label>
      <button onClick={() => setShow(!show)}>{show ? 'Remove' : 'Show'}</button>
      <hr />
      {show && <Welcome duration={duration} />}
    </>
  )
}
