import {  Routes, Route } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/Navbar";
import Home from "./components/Home";
import Play from "./components/Play";
import Leaderboard from "./components/Leaderboard";
import { LeaderboardProvider } from "./context/LeaderboardContext";

function App() {
  const { imageIndex, images, finalColor,finalBlurCard} = useContext(ThemeContext);
  return (
    <>
      <div 
        style={{
           color:finalColor,
      backgroundColor: finalBlurCard,
      backdropFilter: "blur(10px)", 
      transition: "all 0.7s ease" ,
   
          backgroundImage: `url(${images[imageIndex].src})`,
          minHeight: "100vh",
          backgroundRepeat:"no-repeat",
          backgroundSize:"cover",
          backgroundPosition:"center",
          backgroundAttachment:"fixed",

       
        }}>
          <div 
          style={{
            width: "100%",
            minHeight: "100vh",
            color: finalColor,
            backgroundColor: finalBlurCard,
            transition: "all 0.7s ease",
          }}
        >
       
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/play" element={<Play />}></Route>
            <Route path="/leaderboard" element={<Leaderboard />}></Route>
          </Routes>
        
        </div>
      </div>
    </>
  );
}

export default App;
