import {
  createContext,
  useState,
  useEffect,
  useContext,
  Children,
} from "react";

export const ColorFocusGameContext = createContext();
export const ColorFocuseGameProvider = ({ children }) => {
  const ColorDate = [
    { name: "Red", value: "#ff4d4d" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Green", value: "#10b981" },
    { name: "Yellow", value: "#f5e50b" },
  ];

  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [currentColor, setCuurentColor] = useState({ name: "", value: "" });
  const [shuffledOption, setShuffledOption] = useState([]);
  const [reset, setReset]=useState([]);

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const generoterRound = () => {
    const textTarget = getRandomElement(ColorDate);
    let colorTarget = getRandomElement(ColorDate);

    while (colorTarget.name === textTarget.name && Math.random() > 0.2) {
      colorTarget = getRandomElement(ColorDate);
    }

    setCurrentText(textTarget.name);
    setCuurentColor(colorTarget);

    const shuffled = [...ColorDate].sort(() => Math.random() - 0.5);
    setShuffledOption(shuffled);
  };

  useEffect(() => {
    generoterRound();
  }, []);

  const handleOptionClick = (selectedName) => {
    if (selectedName.toLowerCase() === currentColor.name.toLowerCase()) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setScore((prevMistakes) => (prevMistakes > 0 ? prevMistakes - 1 : 0));
      setMistakes((prevMistakes) => prevMistakes + 1);
    }

    generoterRound();
  };

  const handlerestColorGame =()=>{
    setScore(0);
    setMistakes(0)
  }

  return (
    <ColorFocusGameContext.Provider
      value={{
        handleOptionClick,
        score,
        currentText,
        currentColor,
        shuffledOption,
        mistakes,
        handlerestColorGame
      }}
    >
      {children}
    </ColorFocusGameContext.Provider>
  );
};
