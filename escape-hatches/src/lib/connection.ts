type ConnectedCallback = () => void

export function createConnection(_serverUrl: string, _roomId: string) {
  // 실제 구현은 실제로 서버에 연결했을 것입니다.
  let connectedCallback: ConnectedCallback | undefined
  let timeout: number | undefined
  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback()
        }
      }, 100)
    },
    on(event: 'connected', callback: ConnectedCallback) {
      if (connectedCallback) {
        throw Error('핸들러는 두 번 추가할 수 없습니다.')
      }
      if (event !== 'connected') {
        throw Error('"connected" 이벤트만 지원됩니다.')
      }
      connectedCallback = callback
    },
    disconnect() {
      clearTimeout(timeout)
    },
  }
}
