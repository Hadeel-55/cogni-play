import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import {PlayerProvider} from './context/PlayerContext.jsx';
import {MemoryMasterProvider} from './context/MemoryMasterContext.jsx';
import { ColorFocuseGameProvider } from "./context/ColorFocusGameContext.jsx";
import { LeaderboardProvider } from "./context/LeaderboardContext";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <PlayerProvider>
           <LeaderboardProvider>
        <MemoryMasterProvider>
          <ColorFocuseGameProvider>
       
        <App />
      
        </ColorFocuseGameProvider>
        </MemoryMasterProvider>
        </LeaderboardProvider>
      </PlayerProvider>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
;