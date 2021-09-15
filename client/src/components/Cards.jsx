import Card from './Card'
import {useSelector} from 'react-redux'
import '../styles/Cards.css'

export default function Cards(){

    let recipes = useSelector(state => state.recipesLoaded)
    return(
        <div id='divCards'>
            {recipes && recipes.map(function(recipe){
               return <Card key={recipe.id}
               image={recipe.image}
               title={recipe.title}
               diet={recipe.diets}
               />
            })}
        </div>
    )
}