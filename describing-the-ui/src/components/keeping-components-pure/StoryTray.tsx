const StoryTray = ({ stories }) => {
  // 배열 복사 => 순수성 유지
  let storiesToDisplay = stories.slice()
  // 기존 배열을 바꾸지 않음
  storiesToDisplay.push({
    id: 'create',
    label: 'Create Story',
  })
  return (
    <ul>
      {storiesToDisplay.map((story) => (
        <li key={story.id}>{story.label}</li>
      ))}
    </ul>
  )
}

export default StoryTray
