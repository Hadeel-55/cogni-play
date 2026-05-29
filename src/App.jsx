import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/Navbar";
import Home from "./components/Home";
import Play from "./components/Play";
import Leaderboard from "./components/Leaderboard";
function App() {
  return (
    <>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/play" element={<Play />}></Route>
          <Route path="/leaderboard" element={<Leaderboard/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
