import './button.css'
import React, {useContext} from 'react';
import { ThemeContext } from '../../../context';
import { MdOutlineNightlightRound } from "react-icons/md";
import { CiLight } from "react-icons/ci";


const ThemedButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
       <button onClick={toggleTheme}>
        {theme === 'light' ? (<MdOutlineNightlightRound style={{ width: '50px', height: '50px' }} />):(<CiLight style={{ width: '50px', height: '50px', color: 'white' }}/>)}
    </button>
 
  );
};

export default ThemedButton