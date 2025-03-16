import { useState, useEffect } from 'react';

export function Card ({ id, holder, onCardClick }) {
  return (
    <button className="square" onClick={() => onCardClick(id)}>
      { holder }
    </button>
  )
}

export function Board({ cards, onPlay, winner, player }) {
  const updateCardHolder = (id) => {
    const nextCards = cards.map(card => {
      return card.id === id ? {...card, holder: player} : card
    })
    onPlay(nextCards);
  }

  const handleClick = (id) => {
    if (!cards.find(card => card.id === id).holder && !winner) {
      updateCardHolder (id);
    }
  }

  return (
    <>
      <div className="board">
        { 
          cards.map(card => {
            return <Card key={card.id} id={card.id} holder={card.holder} onCardClick={handleClick} />
          })
        }
      </div>
      <p>Next player: {player}</p>
      <p>Winner: { winner ? winner : '-' }</p>
    </>
  )
}

export default function Game () {
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([
    Array.from({ length: 9 }, (_, index) => ({ id: index, holder: null }))
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const nextPlayer = currentMove % 2 === 0 ? 'X' : 'O';
  const currentCards = history[currentMove];

  useEffect(() => {
    if (!winner) {
      const newWinner = checkIfWin(currentCards);
      if (newWinner) setWinner(newWinner);
    }
  }, [history])

  const handlePlay = (nextCards) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextCards];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
    if (nextMove !== currentMove) setWinner(null);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board cards={currentCards} onPlay={handlePlay} winner={winner} player={nextPlayer}/>
      </div>
      <div className="game-info">
        <ol>
          {
            history.map((cards, move) => {
              return (
                <li key={move}>
                  <button onClick={() => jumpTo(move)}>{ move > 0 ? ('Go to move #' + move) : 'Go to game start'}</button>
                </li>
              )
            })
          }
        </ol>
      </div>
    </div>
  )
}

const checkIfWin = (cards) => {
  const winningCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let caseSet of winningCases) {
    const [a, b, c] = caseSet;
    if (cards[a].holder && cards[a].holder === cards[b].holder && cards[a].holder === cards[c].holder) {
      return cards[a].holder
    }
  }
  return null;
}