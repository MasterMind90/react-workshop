import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
function App() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const getUsers = async () => {
    const response = await fetch("https://dummyjson.com/users").then(
      (response) => response.json()
    );
    setUsers(response.users);
  };
  useEffect(() => {
    getUsers();
  }, []);
  console.log("users :>> ", users);
  const updateSearchText = (e) => {
    setSearchText(e.target.value);
  };
  console.log("searchText :>> ", searchText);
  return (
    <div className="container">
      <div className="mt-3">
        <input
          type="text"
          onChange={updateSearchText}
          className="form-control"
          placeholder="Search..."
        />
      </div>
      <ul className="list-group mt-3">
        {users
          .filter(
            (user) =>
              searchText == "" ||
              user.firstName.match(searchText) ||
              user.lastName.match(searchText)
          )
          .map((user, index) => {
            return (
              <li key={index} className="list-group-item">
                <img src={user.image} style={{ width: "50px" }} />
                {user.firstName} {user.lastName}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
