import { useState } from 'react'
import ChatRoom from './ChatRoom.tsx'

export default function App() {
  const [roomId, setRoomId] = useState<string>('general')
  const [isEncrypted, setIsEncrypted] = useState<boolean>(false)
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
          <option value='general'>general</option>
          <option value='travel'>travel</option>
          <option value='music'>music</option>
        </select>
      </label>
      <label>
        <input
          type='checkbox'
          checked={isEncrypted}
          onChange={(e) => setIsEncrypted(e.target.checked)}
        />
        Enable encryption
      </label>
      <hr />
      <ChatRoom roomId={roomId} isEncrypted={isEncrypted} />
    </>
  )
}
