interface ClockProps {
  color: string
  time: string
}

const Clock = ({ color, time }: ClockProps) => {
  return <h1 style={{ color: color }}>{time}</h1>
}

export default Clock
