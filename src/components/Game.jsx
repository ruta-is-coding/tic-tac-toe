import React, { useState, useEffect } from 'react';
import Board from './Board';

const Game = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    useEffect(() => {
        if (!xIsNext && !winner) {
            const timer = setTimeout(() => {
                handleComputerMove();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [xIsNext, winner]);

    const handleClick = (i) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();

        if (winner || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(newHistory.concat([{ squares }]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    };

    const handleComputerMove = () => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();

        const emptySquares = squares.map((square, index) => square === null ? index : null).filter(index => index !== null);

        if (emptySquares.length === 0 || winner) return;

        const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        squares[randomMove] = 'O';

        setHistory(newHistory.concat([{ squares }]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const renderMoves = () => {
        return history.map((_, move) => {
            const desc = move ? `Go to move #${move}` : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{desc}</button>
                </li>
            );
        });
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={handleClick} />
            </div>
            <div className="game-info">
                <div>{winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O')}</div>
                <ol>{renderMoves()}</ol>
            </div>
        </div>
    );
};

const calculateWinner = (squares) => {
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
};

export default Game;