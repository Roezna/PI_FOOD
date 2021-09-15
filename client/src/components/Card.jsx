import '../styles/Cards.css'
export default function Card({image,title,diet}){

return(
    <div className='card'>
        <p id='cardTitle'>{title}</p>
        <img id='cardImagen' src={image} alt="" />
        <div id='cardDiet'>
            <span id='titleDiet'>Tipos de dieta:</span>
            
        </div>
        <div className='diet'>
        {diet.map(element => {
            return <span className='typeDiet'><i>· {element}</i></span>
        })}
        </div>
    </div>
)

}

