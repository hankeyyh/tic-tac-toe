'use client'

import Board from "@/component/board";
import { useState } from "react";

export default function Game() {
    // 历史棋盘
    const [history, setHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
    // 历史位置
    const [historyLocation, setHistoryLocation] = useState<(number | null)[]>([null]);
    // 当前步数
    const [currentMove, setCurrentMove] = useState<number>(0);
    // 当前棋盘
    const currentSquares = history[currentMove];
    // 当前赢家
    const [winner, winLine] = calculateWinner(currentSquares);
    // 当前banner
    const banner = winner ? "Winner: " + winner : xIsNext() ? "Next player: X" : "Next player: O";

    function xIsNext() {
        return currentMove % 2 === 0;
    }

    function handlePlay(nextSquares: (string | null)[], curLocation: number) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        const nextHistoryLocation = [...historyLocation.slice(0, currentMove + 1), curLocation];
        setHistory(nextHistory);
        setHistoryLocation(nextHistoryLocation);
        setCurrentMove(currentMove + 1);
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove);
    }

    function getButtonText(stepIndex: number): string {
        const location = historyLocation[stepIndex];
        if (stepIndex === 0 || location === null) {
            return "游戏开始";
        }
        const { row, col } = getRowCol(location);
        return `跳转到第 ${stepIndex} 步, 行: ${row}, 列: ${col}`;
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
                        winLine={winLine}
                        xIsNext={xIsNext()}
                        onPlay={handlePlay}
                    />
                </div>
                <div className="flex flex-col">
                    {Array.from({length: currentMove + 1}, (_, i) => (
                        <button key={i} className="p-2 border rounded w-60" onClick={() => jumpTo(i)}>
                            {getButtonText(i)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function getRowCol(location: number) {
    return {
        row: Math.floor(location / 3),
        col: location % 3,
    };
}

function calculateWinner(squares: (string | null)[]): [string, number[]] | [null, number[]] {
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
            return [squares[a], lines[i]];
        }
    }

    for (let i = 0; i < columns.length; i++) {
        const [a, b, c] = columns[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], columns[i]];
        }
    }

    for (let i = 0; i < diagonals.length; i++) {
        const [a, b, c] = diagonals[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], diagonals[i]];
        }
    }
    return [null, []];
}