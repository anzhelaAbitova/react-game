import React from 'react'
import Square from './Square'
import { isEndgame } from './../utils'
import { useState, useEffect } from 'react'
import { SizeConsumer } from '../App'

const Board = (props) => {
  const [stepNumber, setStepNumber] = useState(1)
  const [squares, setSquares] = useState(Array(props.size * props.size).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const handleClick = (i) => {
    const squaresC = squares.slice()
    if (getStatus(squaresC, xIsNext ? 'X' : 'O') || squaresC[i]) {
      return
    }
    squaresC[i] = xIsNext ? 'X' : 'O'
    setSquares(squaresC)
    getStatus(squaresC, squaresC[i])
    setXIsNext(!xIsNext)
    setStepNumber(stepNumber + 1)
  }

  const handleNewGame = () => {
    setStepNumber(1)
    setSquares(Array(props.size * props.size).fill(null))
    setXIsNext(true)
  }

  const renderSquare = (i, size) => {
    return (
      <Square
        value={squares[i]}
        size={size}
        onClick={() => handleClick(i)}
        font={props.font}
        key={i}
      />
    )
  }

  const renderBoard = (size) => {
    const array = Array.from(Array(size), () => new Array(size).fill(1))
    let counter = -1
    return array.map((el, index) => {
      return (
        <div className="board-row" style={{ height: `${100 / props.size}%` }} key={index}>
          {el.map((item, indexI) => {
            counter++
            return renderSquare(counter, size)
          })}
        </div>
      )
    })
  }

  const getStatus = (arr, play) => {
    if (isEndgame(arr, play, props.size)) {
      props.handleWinner(xIsNext ? 'X' : 'O')
    } else if (stepNumber >= props.size * props.size) {
      props.handleWinner('Ties')
    }
  }
  useEffect(() => {
    handleNewGame()
  }, [props.isNew])

  return <div className="board">{renderBoard(props.size)}</div>
}

export default Board
