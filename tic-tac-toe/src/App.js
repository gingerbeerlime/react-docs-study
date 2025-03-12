import { useState, useEffect } from 'react';

export default function Game() {
  const winningCases = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ]

  const [cards, setCards] = useState(
    Array.from({ length: 9 }, (_, index) => ({ id: index + 1, holder: null }))
  );

  const [player, setPlayer] = useState('X');

  const [winner, setWinner] = useState(null);

  const checkIfWin = () => {
    const cardsHold = cards.filter(card => card.holder === player).map(card => card.id);
    const hasWinner = winningCases.some(item => item.every(id => cardsHold.includes(id)));
    if (hasWinner) {
      setWinner(player);
    } else {
      setPlayer(prevPlayer => (prevPlayer === 'X' ? 'O' : 'X'));
    }
  }

  useEffect(() => {
    if (winner) return;
    checkIfWin()
  }, [cards])

  const updateCardHolder = (id) => {
    setCards(prevCards => prevCards.map(card => {
      return card.id === id ? {...card, holder: player} : card
    }));
  }

  const clickHandler = (id) => {
    if (!cards.find(card => card.id === id).holder && !winner) {
      updateCardHolder (id);
    }
  }

  return (
    <>
      <div className="board">
        { 
          cards.map(card => {
            return (
              <button className="square" key={card.id} onClick={() => clickHandler(card.id)}>
                { card.holder }
              </button>
            )
          })
        }
      </div>
      <p>Next player: {player}</p>
      <p>Winner: { winner ? winner : '-' }</p>
    </>
  )
}
