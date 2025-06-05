type Theme = 'light' | 'dark'

const themeStyles = {
  light: 'bg-white text-gray-900 border border-gray-200',
  dark: 'bg-gray-800 text-white border border-gray-700',
}

export function showNotification(message: string, theme: Theme = 'light') {
  const notification = document.createElement('div')
  notification.className = `
    fixed top-4 right-4
    ${themeStyles[theme]}
    px-4 py-3 rounded-lg text-sm
    shadow-lg min-w-[200px] max-w-[400px]
    opacity-0 -translate-y-4
    transition-all duration-300 ease-in-out
    z-50
  `
  notification.textContent = message

  document.body.appendChild(notification)

  // CSS 애니메이션을 위한 클래스 추가
  requestAnimationFrame(() => {
    notification.classList.remove('opacity-0', '-translate-y-4')
    notification.classList.add('opacity-100', 'translate-y-0')
  })

  // 일정 시간 후 알림 제거
  setTimeout(() => {
    notification.classList.remove('opacity-100', 'translate-y-0')
    notification.classList.add('opacity-0', '-translate-y-4')
    notification.addEventListener('transitionend', () => {
      document.body.removeChild(notification)
    })
  }, 3000)
}
