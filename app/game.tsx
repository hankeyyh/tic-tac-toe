'use client'

import Board from "@/component/board";
import { useState, useEffect } from "react";

export default function Game() {
    const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const currentSquares = history[currentMove];

    const winner = calculateWinner(currentSquares);
    const banner = winner ? "Winner: " + winner : xIsNext() ? "Next player: X" : "Next player: O";

    function xIsNext() {
        return currentMove % 2 === 0;
    }

    function handlePlay(nextSquares: (string | null)[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(currentMove + 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    return (
        <div className="">
            <div>
                {banner}
            </div>
            <div className="flex flex-row gap-4">
                <div className="flex flex-col">
                    <Board 
                        currentSquares={currentSquares}
                        gameEnded={winner !== null}
                        xIsNext={xIsNext()}
                        onPlay={handlePlay}
                    />
                </div>
                <div className="flex flex-col">
                    {Array.from({length: currentMove + 1}, (_, i) => (
                        <button key={i} className="p-2 border rounded w-30" onClick={() => jumpTo(i)}>
                            {i === 0 ? "游戏开始" : `跳转到第 ${i} 步`}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function calculateWinner(squares: (string | null)[]) {
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