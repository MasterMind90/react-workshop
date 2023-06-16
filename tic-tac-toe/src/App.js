import logo from "./logo.svg";
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import { useState } from "react";
function App() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  console.log("cells :>> ", cells);
  // [0, 1, 2, 3, 4, 5, 6, 7, 8]
  const checkWinner = (cells) => {
    for (let i = 0; i < 3; i++) {
      let ok = true;
      for (let j = 0; j < 3; j++) {
        let index = i * 3 + j;
        let base = i * 3;
        if (!cells[index] || cells[index] !== cells[base]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        console.log("test1");
        if (turn) return "X";
        return "O";
      }
      ok = true;
      for (let j = 0; j < 3; j++) {
        let index = j * 3 + i;
        let base = i;
        if (!cells[index] || cells[index] != cells[base]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        console.log("test2");
        if (turn) return "X";
        return "O";
      }
    }
    let draw = true;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i]) continue;
      draw = false;
    }
    if (cells[0] && cells[0] == cells[4] && cells[4] == cells[8]) {
      console.log("test3");
      if (turn) return "X";
      return "O";
    }
    if (cells[2] && cells[2] == cells[4] && cells[4] == cells[6]) {
      console.log("test4");
      if (turn) return "X";
      return "O";
    }
    return draw ? "Draw" : "None";
  };

  const handleCellClick = (index) => {
    const cur = cells.slice();
    if (cur[index]) return;
    cur[index] = turn ? "X" : "O";
    setTurn(!turn);
    setCells(cur);
    let status = checkWinner(cur);
    if (status == "O" || status == "X" || status == "Draw") {
      setWinner(status);
    }
  };
  const resetGame = () => {
    let cur = Array(9).fill(null);
    setCells(cur);
    setWinner(null);
    setTurn(true);
  };
  return (
    <div className="container">
      <div>
        <button onClick={resetGame}>Reset game</button>
        <h1>{winner ? `Winner is ${winner}` : ``}</h1>
        <div className="row">
          <div className="cell" onClick={() => !winner && handleCellClick(0)}>
            {cells[0] ? cells[0] : ""}
          </div>
          <div className="cell" onClick={() => !winner && handleCellClick(1)}>
            {cells[1] ? cells[1] : ""}
          </div>
          <div className="cell" onClick={() => !winner && handleCellClick(2)}>
            {cells[2] ? cells[2] : ""}
          </div>
        </div>
        <div className="row">
          <div className="cell" onClick={() => !winner && handleCellClick(3)}>
            {cells[3] ? cells[3] : ""}
          </div>
          <div className="cell" onClick={() => !winner && handleCellClick(4)}>
            {cells[4] ? cells[4] : ""}
          </div>
          <div className="cell" onClick={() => !winner && handleCellClick(5)}>
            {cells[5] ? cells[5] : ""}
          </div>
        </div>
        <div className="row">
          <div className="cell" onClick={() => !winner && handleCellClick(6)}>
            {cells[6] ? cells[6] : ""}
          </div>
          <div className="cell" onClick={() => !winner && handleCellClick(7)}>
            {cells[7] ? cells[7] : ""}
          </div>
          <div className="cell" onClick={() => !winner && handleCellClick(8)}>
            {cells[8] ? cells[8] : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
