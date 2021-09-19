import Card from './Card'
import {useSelector} from 'react-redux'
import '../styles/Cards.css'

export default function Cards(){

   let recipes = useSelector(state => state.recipesLoaded)
   let searching = useSelector(state => state.searching)
   let allRecipes = useSelector(state => state.allRecipes)

    return(
        <div className='contenedor'>
            {searching && recipes &&
            <div className='searchBox'>
                <p className='result'>Results for: <span className='resultData'>{searching}</span></p>
            </div>}    
        <div id='divCards'>
            {!recipes.length && searching === "" && allRecipes.map(function(recipe){
               return <Card 
               key={recipe.id}
               image={recipe.image}
               title={recipe.title}
               diet={recipe.diets}
               id={recipe.id}
               />
            })}
        
             {recipes && searching !== '' && recipes.map(function(recipe){
               return <Card key={recipe.id}
               image={recipe.image}
               title={recipe.title}
               diet={recipe.diets}
               id={recipe.id}
               />
            })}
        </div>
        </div>
    )
}