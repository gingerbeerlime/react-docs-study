import { useCounter } from './03-useCounter'

export default function Counter() {
  const count = useCounter(1000)
  return <h1>Seconds passed: {count}</h1>
}
