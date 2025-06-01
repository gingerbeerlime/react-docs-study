import { useEffect } from 'react'
import { createEncryptedConnection, createUnencryptedConnection } from '@/utils/chat'

interface ChatRoomProps {
  roomId: string
  isEncrypted: boolean
}

export default function ChatRoom({ roomId, isEncrypted }: ChatRoomProps) {
  useEffect(() => {
    const createConnect = isEncrypted ? createEncryptedConnection : createUnencryptedConnection
    const connection = createConnect(roomId)
    connection.connect()
    return () => connection.disconnect()
  }, [roomId, isEncrypted])

  return <h1>Welcome to the {roomId} room!</h1>
}
