interface getFinalStateProps {
  baseState: number
  queue: (number | ((prevState: number) => number))[]
}

export function getFinalState({
  baseState,
  queue,
}: getFinalStateProps): number {
  let finalState = baseState

  for (let update of queue) {
    if (typeof update === 'function') {
      finalState = update(finalState)
    } else {
      finalState = update
    }
  }

  return finalState
}
