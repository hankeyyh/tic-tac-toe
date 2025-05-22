'use client'

import { useState } from "react";
import Square from "../square";

export default function Board() {
    const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
    const [oddMove, setOddMove] = useState(true);

    const winner = calculateWinner(squares);
    let banner = null;
    if (winner) {
        banner = "Winner: " + winner;
    } else {
        banner = "Next player: " + (oddMove ? "X" : "O");
    }

    function handleClick(i: number) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.map((square, index) => index === i ? (oddMove ? "X" : "O") : square)
        setSquares(nextSquares);
        setOddMove(!oddMove);
    }

    return (
        <>
            <div className="text-2xl font-bold">{banner}</div>
            <div className="flex flex-row">
                <Square value={squares[0]} onClick={() => handleClick(0)} />
                <Square value={squares[1]} onClick={() => handleClick(1)} />
                <Square value={squares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className="flex flex-row">
                <Square value={squares[3]} onClick={() => handleClick(3)} />
                <Square value={squares[4]} onClick={() => handleClick(4)} />
                <Square value={squares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className="flex flex-row">
                <Square value={squares[6]} onClick={() => handleClick(6)} />
                <Square value={squares[7]} onClick={() => handleClick(7)} />
                <Square value={squares[8]} onClick={() => handleClick(8)} />
            </div>
        </>
    );
}

function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
    ];
    const columns = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ];
    const diagonals = [
        [0, 4, 8],
        [2, 4, 6],
    ];

    // 当横，竖，斜有3个相同的值，则返回该值
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    for (let i = 0; i < columns.length; i++) {
        const [a, b, c] = columns[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    for (let i = 0; i < diagonals.length; i++) {
        const [a, b, c] = diagonals[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}