import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";

import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/Navbar";
import Home from "./components/Home";
import Play from "./components/Play";
import Leaderboard from "./components/Leaderboard";

function App() {
  const { imageIndex, images } = useContext(ThemeContext);
  return (
    <>
      <div
        style={{
          background: `url(${images[imageIndex].src})`,
          height: "100vh",
          backgroundRepeat:"no-repeat",
          backgroundSize:"cover",
          backgroundPosition:"center",
          backgroundAttachment:"fixed",
        }}
      >
        <Router>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/play" element={<Play />}></Route>
            <Route path="/leaderboard" element={<Leaderboard />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
