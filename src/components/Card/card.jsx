import "./card.css"
import { ThemeContext } from "../../context";
import { useContext } from "react";

export default function Card({title, year, big_image}){

    const { theme} = useContext(ThemeContext);

    console.log(theme)

    return(
        <div className="cards" style={{background: theme === 'light' ? 'white' : 'black'}}>
            <div className="card">
            <h3 style={{color: theme === 'light' ? 'black' : 'white'}}>{title}</h3>
            <img src={big_image} alt="" />
            <p style={{color: theme === 'light' ? 'black' : 'white'}}>{year}</p>
            </div>
          
        </div>

    )

}