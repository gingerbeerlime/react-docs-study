import { useCounter } from './04-useCounter'
import { useInterval } from './04-useInterval'

export default function Counter() {
  const count = useCounter(1000)

  useInterval({
    callback: () => {
      const randomColor = `hsla(${Math.random() * 360}, 100%, 50%, 0.2)`
      document.body.style.backgroundColor = randomColor
    },
    delay: 2000,
  })

  return <h1>Seconds passed: {count}</h1>
}
