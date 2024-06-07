import React, { useState } from 'react';
import { baseData } from './constant.js';
import './style.css';

export default function App() {
  const [data, setData] = useState(baseData);
  const [counter, setCounter] = useState(1);
  const [result, setResult] = useState("Game going on...");
  const utility = (row,col) => {
    let currentData = JSON.parse(JSON.stringify([...data]));
    let fieldData = counter % 2 == 0 ? 'O' : 'X';
    currentData[row][col] = fieldData;
    setData([...currentData]);
    let winner = calculateWinner(currentData);
    if(!!winner)
    {setResult(winner+" won...");
    setCounter(10);}
    setCounter((counter) => counter + 1);
  };

  function calculateWinner(squares) {
    const lines = [
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,2], [1,1], [2,0]],
      [[0,0], [1,1], [2,2]],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a[0]][a[1]] && squares[a[0]][a[1]] === squares[b[0]][b[1]] && squares[a[0]][a[1]] === squares[c[0]][c[1]]) {
        return squares[c[0]][c[1]];
      }
    }
    return null;
  }

  const resetGame = () => {
    setData([...baseData]);
    setCounter(1);
    setResult("Game going on...");
 }
  return (
    <div>
      <div className="container">
        {[...new Array(3)].map((key, rowIndex) => {
          return (
            <div key={key} className="rowContainer">
              {[...new Array(3)].map((key, colIndex) => {
                return (
                  <div
                    key={key}
                    className="colContainer"
                    id={rowIndex + '' + colIndex}
                    onClick={() => !data[rowIndex][colIndex] && result === "Game going on..."?utility(rowIndex,colIndex):""}
                    disabled={}
                  >
                    {data[rowIndex][colIndex]}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div><h3>{"Result: ",result}</h3></div>
      <div><button onClick={resetGame}>Reset Game</button></div>
    </div>
  );
}
