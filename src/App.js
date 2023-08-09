import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import Home from "./component/Home.js";
import Score from "./component/Score.js";


function App() {

  const logout = () => {
    localStorage.clear();
    window.location.reload();
    }

  return (
    <div className="App">
      <Router>
        {/* NavBar */}
        <div className="head">
          <div>
            <h1 className="topic">Rock Paper Scissor</h1>
          </div>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Menu
            </button>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/">Home</Link></li>
              <li><Link className="dropdown-item" to="/score">Score</Link></li>
              <hr></hr>
              <li onClick={logout} className="logout"> &nbsp; &nbsp; LogOut</li>
            </ul>
          </div>
        </div>

        {/* Router Link */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/score" element={<Score />}></Route>
        </Routes>
      </Router>
    </div>


  );
}

export default App;
