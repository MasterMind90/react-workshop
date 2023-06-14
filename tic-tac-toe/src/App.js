import logo from "./logo.svg";
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import { useState } from "react";
function App() {
  const [cells, setCells] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true);
  console.log("cells :>> ", cells);

  const checkWinner = (cells) => {
    for (let i = 0; i < 3; i++) {
      let ok = true;
      for (let j = 0; j < 3; j++) {
        let index = i * 3 + j;
        let base = i * 3;
        if (!cells[index] || cells[index] != cells[base]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        if (cells[i * 3] == "X") return "X";
        return "O";
      }
    }
    return "Draw";
  };

  const handleCellClick = (index) => {
    const cur = cells.slice();
    if (cur[index]) return;
    cur[index] = turn ? "X" : "O";
    setTurn(!turn);
    setCells(cur);
    console.log("checkWinner() :>> ", checkWinner(cur));
  };
  return (
    <div className="container">
      <div>
        <div className="row">
          <div className="cell" onClick={() => handleCellClick(0)}>
            {cells[0] ? cells[0] : ""}
          </div>
          <div className="cell" onClick={() => handleCellClick(1)}>
            {cells[1] ? cells[1] : ""}
          </div>
          <div className="cell" onClick={() => handleCellClick(2)}>
            {cells[2] ? cells[2] : ""}
          </div>
        </div>
        <div className="row">
          <div className="cell" onClick={() => handleCellClick(3)}>
            {cells[3] ? cells[3] : ""}
          </div>
          <div className="cell" onClick={() => handleCellClick(4)}>
            {cells[4] ? cells[4] : ""}
          </div>
          <div className="cell" onClick={() => handleCellClick(5)}>
            {cells[5] ? cells[5] : ""}
          </div>
        </div>
        <div className="row">
          <div className="cell" onClick={() => handleCellClick(6)}>
            {cells[6] ? cells[6] : ""}
          </div>
          <div className="cell" onClick={() => handleCellClick(7)}>
            {cells[7] ? cells[7] : ""}
          </div>
          <div className="cell" onClick={() => handleCellClick(8)}>
            {cells[8] ? cells[8] : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
