export const getLabel = (text: string) => {
  if (text === 'Drinks') return '음료'
  else if (text === 'Vegetables') return '야채'
  else if (text === 'Protein') return '단백질'
  else if (text === 'amount') return '개'
  else return text
}

export const getLabel_Emoji = (text: string) => {
  if (text === 'Drinks') return '🥛음료'
  else if (text === 'Vegetables') return '🥕야채'
  else if (text === 'Protein') return '🥚단백질'
  else return text
}
