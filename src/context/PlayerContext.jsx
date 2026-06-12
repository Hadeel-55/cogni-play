import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
export const PlayerContext = createContext();
export const PlayerProvider = ({ children }) => {
  const [profileTemporary, setProfileTemporary] = useState({
    name: "Hadil Alchamma",
    difficulty: "normal",
    focusGoal: 10,
  });
  const [profileSaved, setProfileSaved] = useState({
    name: "Hadil Alchamma",
    difficulty: "normal",
    focusGoal: 10,
  });

  useEffect(()=>{
const localProfile = localStorage.getItem("playerProfile");
if(localProfile){
    setProfileSaved(JSON.parse(localProfile))
    setProfileTemporary(JSON.parse(localProfile))
  }

  },[])
  const handleSaveProfile=(e)=>{
    e.preventDefault();
    setProfileSaved(profileTemporary);
    localStorage.setItem("playerProfile", JSON.stringify(profileTemporary));
    navigate('/play')
  }
  const [timer ,setTimer]=useState(60);
  const navigate = useNavigate();
useEffect(()=>{
let interval =null;
if(window.location.pathname === '/play'){

  interval =setInterval(()=>{
    setTimer((prev)=>{
      if(prev <= 1){
        clearInterval(interval);
        return 0;
      }
      return prev - 1;
    })

    },1000)
}
return () =>{
  clearInterval(interval)
  setTimer(60);
}
},[navigate])


  return (
    <PlayerContext.Provider
      value={{
        profileTemporary,
        setProfileTemporary,
        profileSaved,
        setProfileSaved,
        handleSaveProfile,
        timer,
        setTimer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
