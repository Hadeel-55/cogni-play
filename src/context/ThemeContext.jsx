import { createContext } from "react";
import { useState } from "react";
export const ThemeContext =createContext();
export const ThemeProvider =({children})=>{

    const [theme,setTheme]=useState('#eeff05');

    const handleChengeTheme = (event)=>{
setTheme(event.target.value)
    }
const [isDark ,setIsDark]=useState(false);
const handleIsDark=()=>{
    setIsDark(!isDark);
}

const images =[
      {
      src: "https://picsum.photos/800/400?random=1",
      alt: "image 1",
    },
    {
      src: "https://picsum.photos/800/400?random=2",
      alt: "image 2",
    },
    {
      src: "https://picsum.photos/800/400?random=3",
      alt: "image 3",
    },
    {
      src: "https://picsum.photos/800/400?random=4",
      alt: "image 4",
    }  
]
const [imageIndex , setImageIndex]=useState(0);
const NextImage=()=>{
    setImageIndex((prev)=>(prev+1) % images.length);
}
const prevImage=()=>{
    setImageIndex((prev)=>(prev === 0 ? images.length -1 : prev -1))
}

  const textTheme={
    color:theme,
  }
    const finalBlurCard = isDark
    ? "rgba(212, 212, 212, 0.33)"
    : "rgba(0, 0, 0, 0.5)"
   ;
    
    const finalColor = isDark ? "black": "white"
      const btnTheme ={
    backgroundColor:theme,
   border: `1px solid ${theme}`,
transition:"all 0.3s ease"
  }
return(
    <ThemeContext.Provider value={{
handleChengeTheme,handleIsDark,isDark,
theme,imageIndex,NextImage,prevImage,images
,finalColor,finalBlurCard,textTheme,btnTheme

    }}>
        {children}

    </ThemeContext.Provider>
)

}
