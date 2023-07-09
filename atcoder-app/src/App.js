// import logo from './logo.svg';
// import './App.css';

import { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(5000);
  const [click, setClick] = useState(false);
  const [allProblems, setAllProblems] = useState([]);
  const getProblemsRating = async () => {
    const problems = await fetch(
      "https://kenkoooo.com/atcoder/resources/problem-models.json"
    ).then((res) => res.json());
    let rows = [];
    for (const [key, value] of Object.entries(problems)) {
      console.log("key :>> ", key);
      console.log("value :>> ", value);
      rows.push({ problem: key, difficulty: value.difficulty });
    }
    setAllProblems(rows);
  };
  useEffect(() => {
    getProblemsRating();
  }, [click]);
  return (
    <>
      <div className="container">
        <h1 className="display-1">Atcoder Problems Difficulty</h1>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            <input
              placeholder="Enter rating from"
              type="text"
              className="form-control"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="col-6">
            <input
              placeholder="Enter rating to"
              type="text"
              className="form-control"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <div className="d-grid">
              <button
                className="btn btn-danger"
                onClick={() => setClick(!click)}
              >
                Lets go
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div classNam="row">
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Problem</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {allProblems
                  .filter((obj) => {
                    return obj.difficulty >= from && obj.difficulty <= to;
                  })
                  .map((obj, index) => {
                    return (
                      <tr key={index}>
                        <td>{index}</td>
                        <td>{obj.problem}</td>
                        <td>{obj.difficulty}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
