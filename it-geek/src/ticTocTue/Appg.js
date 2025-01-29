// App.js
import React, { useState } from 'react';
import './App.css';

function Square({ value, handleClick }) {
    // console.log(value , "  :  ", handleClick)
    return (
        <button className="square" onClick={handleClick}>
            {value}
        </button>
    );
}

function Board() {
    const [squares, setSquares] = useState(["", "", "", "", "", "", "", "", ""]);
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (i) => {
        const squaresCopy = squares;
        if (calculateWinner(squares) || squaresCopy[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setSquares(squares);
        setXIsNext(!xIsNext);
        // console.log(" squaresCopy):- ", squares)
        // console.log(" squaresCopy):- ", squaresCopy[i])

    };

    // const renderSquare = (i) => {
    //     console.log("Squre render :", i)
    //     return <Square value={squares[i]} onClick={() => handleClick(i)} />;
    // };

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        // console.log("Wiinneerr ", winner)
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    const handleReset = () => {
        setSquares(["", "", "", "", "", "", "", "", ""])
    }
    return (
        <div>
            <div className="status">{status}</div>
            <button onClick={handleReset}>Reset</button>
            <br /><br />
            <div className="board-row">
                <Square value={squares[0]} handleClick={() => handleClick(0)} />
                 <Square value={squares[1]} handleClick={() => handleClick(1)} />
               <Square value={squares[2]} handleClick={() => handleClick(2)} />
                {/* {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)} */}
            </div>
            <div className="board-row">
                <Square value={squares[3]} handleClick={() => handleClick(3)} />
                <Square value={squares[4]} handleClick={() => handleClick(4)} />
                <Square value={squares[5]} handleClick={() => handleClick(5)} />
                {/* {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)} */}
            </div>
            <div className="board-row">
                <Square value={squares[6]} handleClick={() => handleClick(6)} />
                <Square value={squares[7]} handleClick={() => handleClick(7)} />
                <Square value={squares[8]} handleClick={() => handleClick(8)} />
                {/* {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)} */}
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    // console.log("calculateWinner ", squares)
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function App() {
    return (
        <div className="game">
            <div className="game-board">
                <Board />
            </div>
        </div>
    );
}

export default App;
