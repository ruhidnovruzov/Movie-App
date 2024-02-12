import { createContext } from "react";
import { useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) =>{
    const [theme, setTheme] = useState("light")

    const toggleTheme = () =>{
        setTheme(prevThem => prevThem === 'light' ? 'dark':'light')
    }

    return(
        <ThemeContext.Provider value={{ theme ,toggleTheme}}> 
        { children }
        </ThemeContext.Provider>
    )
}

