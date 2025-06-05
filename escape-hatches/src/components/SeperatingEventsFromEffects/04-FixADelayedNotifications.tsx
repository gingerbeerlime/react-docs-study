import { useState, useEffect } from 'react'
import { experimental_useEffectEvent as useEffectEvent } from 'react'
import { createConnection } from '@/lib/connection'
import { showNotification } from '@/helper/notifications'

const serverUrl = 'https://localhost:1234'

type Theme = 'light' | 'dark'

function ChatRoom({ roomId, theme }: { roomId: string; theme: Theme }) {
  const onConnected = useEffectEvent((roomId: string) => {
    showNotification(roomId + '에 오신 것을 환영합니다', theme)
  })

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    let timeoutId: number | undefined
    connection.on('connected', () => {
      timeoutId = setTimeout(() => {
        onConnected(roomId)
      }, 2000)
    })
    connection.connect()
    return () => {
      connection.disconnect()
      clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId])

  return <h1>{roomId} 방에 오신 것을 환영합니다!</h1>
}

export default function App() {
  const [roomId, setRoomId] = useState('general')
  const [isDark, setIsDark] = useState(false)
  return (
    <>
      <label>
        채팅방 선택:{' '}
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value='general'>general</option>
          <option value='travel'>travel</option>
          <option value='music'>music</option>
        </select>
      </label>
      <label>
        <input type='checkbox' checked={isDark} onChange={(e) => setIsDark(e.target.checked)} />
        어두운 테마 사용
      </label>
      <hr />
      <ChatRoom roomId={roomId} theme={isDark ? 'dark' : 'light'} />
    </>
  )
}
