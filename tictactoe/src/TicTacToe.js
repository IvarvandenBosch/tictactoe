import React, {useState} from 'react'

const TicTacToe = ({num}) => {

  const [turn, setTurn] = useState('x')
  const [cells, setCells] = useState(Array(9).fill(''))
  const [winner, setWinner] = useState()
  const [clickAmount, setClickAmount] = useState(0)

  const checkWinner = (squares) => {
    const combos = {
      across: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
      ],
      down: [
        [0,3,6],
        [1,4,7],
        [2,5,8],
      ],
      diagonal: [
        [0,4,8],
        [2,4,6],
      ],
    }
    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === '' || 
          squares[pattern[1]] === '' ||
          squares[pattern[2]] === '' 
        ) {
          // do nothing
        }
        else if (
          squares[pattern[0]] === squares[pattern[1]] && 
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]])
          console.log(winner)
        } else if (
          clickAmount === 8
        )
        {
          setWinner('draw')
        }
      }) 
    }
  }

  const handleReset = () => {
    setCells(Array(9).fill(''))
    setWinner()
    setTurn('x')
    setClickAmount(0)
  }
  
  const handleClick = (num) => {
    if (cells[num] !== '') {
      setClickAmount(prevAmount => prevAmount - 1)
      return;
    }

    let squares = [...cells]
    if (turn === 'x') {
      squares[num] = 'x'
      setTurn('o')
    } else {
      squares[num] = 'o'
      setTurn('x')
    }

    setClickAmount(prevAmount => prevAmount + 1)
    setCells(squares)
    checkWinner(squares)
  }

  const Cell = ({num}) => {
    return (
        <td 
          onClick={() => handleClick(num)} 
            style={{color: cells[num] === 'x' ? "red" : "blue"}}
        >
          {cells[num]}
        </td>
      )
  }

  return (
    <div className='container'>
        <p className='turn'>Turn: <span style={{color: turn === 'x' ? "red" : "blue"}}>{turn}</span></p>
        <table>
          <tbody style={{pointerEvents: winner && 'none'}}>
            <tr>
              <Cell num={0} />
              <Cell num={1} />
              <Cell num={2} />
            </tr>
            <tr>
              <Cell num={3} />
              <Cell num={4} />
              <Cell num={5} />
            </tr>
            <tr>
              <Cell num={6} />
              <Cell num={7} />
              <Cell num={8} />
            </tr>
        </tbody>
      </table>
      {winner && (
        <div className='win'>
          <section>
            <p><span>{winner}</span> {winner !== 'draw' ? "is the winner" : ''}</p>
            <div className='center'>
              <button 
                onClick={() => handleReset()} 
                className="reset"
              >
                Play again
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default TicTacToe