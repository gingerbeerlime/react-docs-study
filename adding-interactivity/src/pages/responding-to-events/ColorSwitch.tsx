interface ColorSwitchProps {
  onChangeColor: () => void
}

export default function ColorSwitch({ onChangeColor }: ColorSwitchProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        onChangeColor()
      }}
    >
      Change color
    </button>
  )
}
