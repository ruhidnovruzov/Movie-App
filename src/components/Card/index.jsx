import "./style.css"
export default function Card({title, year, big_image}){

    return(
        <div className="cards">
            <div className="card">
            <h3>{title}</h3>
            <img src={big_image} alt="" />
            <p>{year}</p>
            </div>
          
        </div>

    )

}