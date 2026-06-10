import { createContext, useState, useEffect, useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";

export const LeaderboardContext = createContext();
export const LeaderboardProvider = ({ children }) => {
  const { profileTemporary } = useContext(PlayerContext);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const [overallScore, setOverallScore] = useState(() => {
    const savedScore = localStorage.getItem("overallScore");
    return savedScore ? JSON.parse(savedScore) : 0;
  });

  const [recentSessions, setRecentSessions] = useState(() => {
    const savedSeeion = localStorage.getItem("recentSessions");
    return savedSeeion ? JSON.parse(savedSeeion) : [];
  });

  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const addGameSession = (isWon) => {
    const now = new Date();
    const currentDate = now.toLocaleDateString('en-GB');
    const currentTime = now.toTimeString().split(" ")[0];

    const playerActualName = profileTemporary?.name
      ? profileTemporary.name.toUpperCase()
      : "HADIL ALCHAMMA";

    const newSession = {
      id: Date.now(),
      date: currentDate,
      endTime: currentTime,
      name: playerActualName,
      timeLeft: timeLeft || 0,
      status: isWon ? "Won" : "Lost",
    };

    setRecentSessions((prevSessions) => {
      const updatedSession = [newSession, ...prevSessions];
      localStorage.setItem("recentSessions", JSON.stringify(updatedSession));
      return updatedSession;
    });

    if (isWon) {
   const currentSavedScore = localStorage.getItem("overallScore");
      const parsedScore = currentSavedScore ? JSON.parse(currentSavedScore) : 0;
      const nextScore = parsedScore + 1;

      localStorage.setItem("overallScore", JSON.stringify(nextScore));
      setOverallScore(nextScore);
    }
  };

  const navigate = useNavigate();

  const handleFinish = (gameStatus) => {
    setIsTimerActive(false);
console.log("Game Status Received:", gameStatus);
    const isWon =
      String(gameStatus).toLocaleLowerCase === "won" || gameStatus === true;

    addGameSession(isWon);

    navigate("/leaderboard");
  };

  const handleLeaderboard = () => {
    navigate("/leaderboard");
  };
  return (
    <LeaderboardContext.Provider
      value={{
        overallScore,
        recentSessions,
        timeLeft,
        setTimeLeft,
        setIsTimerActive,
        handleFinish,
        handleLeaderboard,
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
};
