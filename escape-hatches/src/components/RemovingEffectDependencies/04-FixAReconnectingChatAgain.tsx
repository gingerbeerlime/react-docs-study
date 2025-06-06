import { useEffect } from 'react'
import { experimental_useEffectEvent as useEffectEvent } from 'react'
import { createEncryptedConnection, createUnencryptedConnection } from '@/utils/chat'

type ChatRoomProps = {
  roomId: string
  isEncrypted: boolean
  onMessage: (msg: string) => void
}

export default function ChatRoom({ roomId, isEncrypted, onMessage }: ChatRoomProps) {
  const onReceiveMessage = useEffectEvent(onMessage)

  useEffect(() => {
    function createConnection() {
      const options = {
        serverUrl: 'https://localhost:1234',
        roomId: roomId,
      }
      if (isEncrypted) {
        return createEncryptedConnection(options.serverUrl, options.roomId)
      } else {
        return createUnencryptedConnection(options.serverUrl, options.roomId)
      }
    }
    const connection = createConnection()
    connection.on('message', (msg: string) => onReceiveMessage(msg))
    return () => connection.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, isEncrypted])

  return <h1>Welcome to the {roomId} room!</h1>
}
