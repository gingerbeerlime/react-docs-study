import { useEffect } from 'react'
import { createConnection } from './chat.js'

type ChatRoomProps = {
  serverUrl: string
  roomId: string
}

export default function ChatRoom({ options }: { options: ChatRoomProps }) {
  const { serverUrl, roomId } = options
  useEffect(() => {
    const connection = createConnection({
      serverUrl,
      roomId,
    })
    connection.connect()
    return () => connection.disconnect()
  }, [serverUrl, roomId])

  return <h1>Welcome to the {options.roomId} room!</h1>
}
