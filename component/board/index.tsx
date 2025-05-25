'use client'

import Square from "../square";

export default function Board({
    currentSquares,
    gameEnded,
    winLine,
    xIsNext,
    onPlay,
}: {
    currentSquares: (string | null)[];
    gameEnded: boolean;
    winLine: number[];
    xIsNext: boolean;
    onPlay: (nextSquares: (string | null)[], curLocation: number) => void;
}) {
    function handleClick(i: number) {
        if (currentSquares[i] || gameEnded) {
            return;
        }
        const nextSquares = currentSquares.map((square, index) =>
            index === i ? (xIsNext ? "X" : "O") : square
        );

        onPlay(nextSquares, i);
    }

    return (
        <>
            {[0, 1, 2].map((row) => (
                <div key={row} className="flex flex-row">
                    {[0, 1, 2].map((col) => {
                        const index = row * 3 + col;
                        const isWinLine = winLine.includes(index);
                        return (
                            <Square
                                key={index}
                                value={currentSquares[index]}
                                onClick={() => handleClick(index)}
                                isWinLine={isWinLine}
                            />
                        );
                    })}
                </div>
            ))}
        </>
    );
}

