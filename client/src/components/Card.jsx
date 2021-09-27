import '../styles/Cards.css'
import { Link } from 'react-router-dom'
import { getRecipeDetail, loading } from '../actions'
import { useDispatch } from 'react-redux';

export default function Card({image,title,diet,id}){

    const dispatch = useDispatch();

    const handleClick = (id) =>  {
        dispatch(loading())
        dispatch(getRecipeDetail(id))
    }   

return(
   <div className='card' key={id}>
       <Link to='/recipeDetail'  className='detail' onClick={() => handleClick(id)}>
    
        <p id='cardTitle'>{title}</p>
        <img id='cardImagen' src={image} alt={title} />
        <div id='cardDiet'>
            <span id='titleDiet'>Type of diet</span>
            
        </div>
        <div className='diet'>
        {diet && diet.map((element,indice) => {
            return<span className='typeDiet' key={indice}>
                <i><span className='item'>-</span> {element}</i>
                </span>
        })}
        </div>
        </Link>
    </div>
)

}

