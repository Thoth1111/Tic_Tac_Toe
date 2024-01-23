import React, { useState } from 'react';

const Board: React.FC = () => {
    const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null));
    const [x, setX] = useState<boolean>(true);
    const [winner, setWinner] = useState<string>('');

    const handleClick = (i: number) => {
        if (squares[i] || winner) {
            return;
        }

        const squaresCopy = [...squares];
        squaresCopy[i] = x ? 'X' : 'O';

        setSquares(squaresCopy);
        setX(!x);
        findWinner(squaresCopy);
    };

    const findWinner = (squares: Array<string | null>) => {
        const winCombinations = [
            [0, 1, 2], // top row
            [3, 4, 5], // middle row
            [6, 7, 8], // bottom row
            [0, 3, 6], // left column
            [1, 4, 7], // middle column
            [2, 5, 8], // right column
            [0, 4, 8], // left diagonal
            [2, 4, 6], // right diagonal
        ];

        for(let i=0; i<winCombinations.length; i++) {
            const [a, b, c] = winCombinations[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                setWinner(squares[a] as string);
                return;
            }
        }
    };

    const reset = () => {
        setSquares(Array(9).fill(null));
        setX(true);
        setWinner('');
    };

    const square = (i: number) => (
        <button className="square" onClick={() => handleClick(i)}>
            {squares[i]}
        </button>
    );

  return (
    <div>
        <div className="status">
            {winner ? 
            (
                <span> Winner: {winner} </span>
            ) : (
                <span> Next player: {x ? 'X' : 'O'}</span>
            )}
        </div>
        <div className="container">
            <div className="row">
                <div className="col-sm p-0 m-0">
                    {square(0)}
                </div>
                <div className="col-sm p-0 m-0">
                    {square(1)}
                </div>
                <div className="col-sm p-0 m-0">
                    {square(2)}
                </div>
            </div>
            <div className="row">
                <div className="col-sm p-0 m-0">
                    {square(3)}
                </div>
                <div className="col-sm p-0 m-0">
                    {square(4)}
                </div>
                <div className="col-sm p-0 m-0">
                    {square(5)}
                </div>
            </div>
            <div className="row">
                <div className="col-sm p-0 m-0">
                    {square(6)}
                </div>
                <div className="col-sm p-0 m-0">
                    {square(7)}
                </div>
                <div className="col-sm p-0 m-0">
                    {square(8)}
                </div>
            </div>
        </div>
        
        <button className="btn btn-primary" onClick={reset}>Reset</button>
    </div>
  )
}

export default Board