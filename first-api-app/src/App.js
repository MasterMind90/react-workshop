import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import problems from "./data/data1";

function App() {
  const [selectValue, setSelectValue] = useState("");
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(5000);
  const [checkBoxes, setCheckBoxes] = useState({
    grayCheck: false,
    brownCheck: false,
    greenCheck: false,
    cyanCheck: false,
    blueCheck: false,
    yellowCheck: false,
    orangeCheck: false,
    redCheck: false,
  });
  useEffect(() => {
    let a = 0;
    let b = 0;
    if (selectValue == "gray") {
      a = 0;
      b = 399;
    } else if (selectValue == "brown") {
      a = 400;
      b = 799;
    } else if (selectValue == "green") {
      a = 800;
      b = 1199;
    } else if (selectValue == "cyan") {
      a = 1200;
      b = 1599;
    } else if (selectValue == "blue") {
      a = 1600;
      b = 1999;
    } else if (selectValue == "yellow") {
      a = 2000;
      b = 2399;
    } else if (selectValue == "orange") {
      a = 2400;
      b = 2799;
    } else if (selectValue == "red") {
      a = 2800;
      b = 3199;
    } else {
      a = 0;
      b = 5000;
    }
    setFrom(a);
    setTo(b);
  }, [selectValue]);
  console.log("checkBoxes :>> ", checkBoxes);
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="From..."
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="To..."
            className="form-control"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="checkgray"
              name="grayCheck"
              defaultChecked={checkBoxes.grayCheck}
              onChange={(e) => {
                setCheckBoxes((prev) => {
                  return { ...prev, [e.target.name]: !e.target.checked };
                });
              }}
            />
            <label className="form-check-label" htmlFor="checkgray">
              Gray
            </label>
          </div>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="checkbrown"
              name="brownCheck"
              onChange={(e) =>
                setCheckBoxes((prev) => {
                  return { ...prev, [e.target.name]: !e.target.checked };
                })
              }
            />
            <label className="form-check-label" htmlFor="checkbrown">
              Brown
            </label>
          </div>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="checkgray"
            />
            <label className="form-check-label" htmlFor="checkgray">
              Gray
            </label>
          </div>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="checkgray"
            />
            <label className="form-check-label" htmlFor="checkgray">
              Gray
            </label>
          </div>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="checkgray"
            />
            <label className="form-check-label" htmlFor="checkgray">
              Gray
            </label>
          </div>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="checkgray"
            />
            <label className="form-check-label" htmlFor="checkgray">
              Gray
            </label>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <select
            value={selectValue}
            className="form-select"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="all">All</option>
            <option value="gray">Gray</option>
            <option value="brown">Brown</option>
            <option value="green">Green</option>
            <option value="cyan">Cyan</option>
            <option value="blue">Blue</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
            <option value="red">Red</option>
          </select>
        </div>
      </div>
      <ul className="list-group mt-3">
        {problems
          .filter((problem) => {
            if (checkBoxes.grayCheck) {
              return problem.rating >= 0 && problem.rating < 400;
            }
            if (checkBoxes.brownCheck) {
              return problem.rating >= 400 && problem.rating < 800;
            }
            if (checkBoxes.greenCheck) {
              return problem.rating >= 800 && problem.rating < 1200;
            }
            if (checkBoxes.cyanCheck) {
              return problem.rating >= 1200 && problem.rating < 1600;
            }
            if (checkBoxes.blueCheck) {
              return problem.rating >= 1600 && problem.rating < 2000;
            }
            if (checkBoxes.yellowCheck) {
              return problem.rating >= 2000 && problem.rating < 2400;
            }
            if (checkBoxes.orangeCheck) {
              return problem.rating >= 2400 && problem.rating < 2800;
            }
            if (checkBoxes.redCheck) {
              return problem.rating >= 2800 && problem.rating < 3200;
            }
            return problem.rating >= from && problem.rating <= to;
          })
          .sort((a, b) => {
            if (a.rating < b.rating) return 1;
            else if (a.rating > b.rating) return -1;
            return 0;
          })
          .map((problem, index) => {
            return (
              <li key={index} className="list-group-item">
                <div className="row">
                  <div className="col">
                    <a href={problem.link} style={{ color: problem.color }}>
                      {problem.title}
                    </a>
                  </div>
                  <div className="col">
                    {/* <span>{problem.points}</span> */}
                    <span>{problem.rating}</span>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
