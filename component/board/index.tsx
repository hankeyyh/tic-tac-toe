'use client'

import Square from "../square";

export default function Board({
    currentSquares,
    gameEnded,
    xIsNext,
    onPlay
}: {
    currentSquares: (string | null)[];
    gameEnded: boolean;
    xIsNext: boolean;
    onPlay: (nextSquares: (string | null)[]) => void;
}) {
    function handleClick(i: number) {
        if (currentSquares[i] || gameEnded) {
            return;
        }
        const nextSquares = currentSquares.map((square, index) =>
            index === i ? (xIsNext ? "X" : "O") : square
        );

        onPlay(nextSquares);
    }

    return (
        <>
            <div className="flex flex-row">
                <Square value={currentSquares[0]} onClick={() => handleClick(0)} />
                <Square value={currentSquares[1]} onClick={() => handleClick(1)} />
                <Square value={currentSquares[2]} onClick={() => handleClick(2)} />
            </div>
            <div className="flex flex-row">
                <Square value={currentSquares[3]} onClick={() => handleClick(3)} />
                <Square value={currentSquares[4]} onClick={() => handleClick(4)} />
                <Square value={currentSquares[5]} onClick={() => handleClick(5)} />
            </div>
            <div className="flex flex-row">
                <Square value={currentSquares[6]} onClick={() => handleClick(6)} />
                <Square value={currentSquares[7]} onClick={() => handleClick(7)} />
                <Square value={currentSquares[8]} onClick={() => handleClick(8)} />
            </div>
        </>
    );
}

