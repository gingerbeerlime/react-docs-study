import { useCounter } from './01-useCounter'

export default function Counter() {
  const count = useCounter()
  return <h1>Seconds passed: {count}</h1>
}
