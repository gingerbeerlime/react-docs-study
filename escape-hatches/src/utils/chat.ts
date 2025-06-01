export function createConnection(serverUrl: string, roomId: string) {
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...')
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl)
    },
  }
}

export function createEncryptedConnection(roomId: string) {
  // 실제 구현은 실제로 서버에 연결됩니다.
  return {
    connect() {
      console.log('✅ 🔐 Connecting to "' + roomId + '... (encrypted)')
    },
    disconnect() {
      console.log('❌ 🔐 Disconnected from "' + roomId + '" room (encrypted)')
    },
  }
}

export function createUnencryptedConnection(roomId: string) {
  // 실제 구현은 실제로 서버에 연결됩니다.
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '... (unencrypted)')
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room (unencrypted)')
    },
  }
}
