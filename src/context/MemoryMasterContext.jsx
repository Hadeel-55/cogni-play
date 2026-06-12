import { createContext, useState, useEffect,useContext } from "react";
import { LeaderboardContext } from "./LeaderboardContext";
const allCards = [
  { id: 1, color: "#f1c40f", emoji: "⭐", name: "star" },
  { id: 2, color: "#e67e22", emoji: "🔥", name: "fire" },
  { id: 3, color: "#3498db", emoji: "🌊", name: "wave" },
  { id: 4, color: "#e74c3c", emoji: "🌹", name: "rose" },
  { id: 5, color: "#9b59b6", emoji: "🌸", name: "flower" },
  { id: 6, color: "#edabc2", emoji: "🍑", name: "peach" },
  { id: 7, color: "#2ecc71", emoji: "🍀", name: "clover" },
  { id: 8, color: "#1abc9c", emoji: "💎", name: "diamond" },
];

const difficutyLevels = {
  easy: { name: "easy", count: 4, maxLevels: 5 },
  normal: { name: "normal", count: 6, maxLevels: 6 },
  hard: { name: "hard", count: 8, maxLevels: 8 },
};

export const MemoryMasterContext = createContext();
export const MemoryMasterProvider = ({ children }) => {

  const { handleFinish, setIsTimerActive, setTimeLeft } = useContext(LeaderboardContext);
  const [difficulty, setDifficulty] = useState("normal");
  const [cards, setCards] = useState([]);

  const [isDisplaySequence, setIsDisplaySequence] = useState(false);
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);
  const [gameStatus, setGameStatus] = useState("idle");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const currentMaxLevels = difficutyLevels[difficulty].maxLevels;
  // window width
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  const resetGame = () => {
    const cardCount = difficutyLevels[difficulty].count;
    setCards(allCards.slice(0, cardCount));
    setSequence([]);
    setUserSequence([]);
    setLevel(1);
    setGameStatus("idle");
    setActiveCardId(null);
    setIsDisplaySequence(false);
    setIsTimerActive(false);
  };

const startGame =()=>{
  setGameStatus('playing');
  setLevel(1);
  setTimeLeft(60);
  setIsTimerActive(true);
  ganerateNextSequence([],1);
}

const ganerateNextSequence=(currentSeq , nextLevel)=>{
  const cardCount = difficutyLevels[difficulty].count;
  const nextSeq = [...currentSeq];


  const randomCardIndex =  Math.floor(Math.random()* cardCount);
  const randomCardId = allCards[randomCardIndex].id;
  nextSeq.push(randomCardId);

  setSequence(nextSeq);
  setUserSequence([]);
  playSequence(nextSeq);

}

const playSequence =(seq)=>{
  setIsDisplaySequence(true);
  let index =0 ;
  const interval= setInterval(()=>{
setActiveCardId(seq[index]);

setTimeout(()=>{
  setActiveCardId(null)
},600);
index++

if(index >= seq.length){
  clearInterval(interval);
  setTimeout(()=>{
    setIsDisplaySequence(false)
  },500)
}
 },1000)
}

const handleCardClick=(cardId)=>{
  if(isDisplaySequence || gameStatus !== 'playing') return;

  const newUserSequence =[...userSequence,cardId];
  setUserSequence(newUserSequence);

  const currentIndex =newUserSequence.length -1 ;
  if(newUserSequence[currentIndex] !== sequence[currentIndex]){
    setGameStatus('lost');
    return;
  }
  if(newUserSequence.length === sequence.length){
    if(level === currentMaxLevels){
      setGameStatus('won')
    }else{
      setTimeout(()=>{
        const nextLevel =level + 1;
        setLevel(nextLevel);
        ganerateNextSequence(sequence,nextLevel);
      },1000)
    }
  }
}


  return (
    <MemoryMasterContext.Provider
      value={{
difficulty,
allCards,
difficutyLevels,
setDifficulty,
isDisplaySequence,
gameStatus,
activeCardId,
handleCardClick,
userSequence,
sequence,
resetGame,startGame,
cards,
level,
currentMaxLevels,
  
      }}
    >
      {children}
    </MemoryMasterContext.Provider>
  );
};
