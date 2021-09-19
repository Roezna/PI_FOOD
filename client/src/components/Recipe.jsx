import { useSelector } from "react-redux";
import Nav from "./Nav";
export default function Recipe(){
    const recipe = useSelector(state => state.recipeDetail)  

    return(
        <div>
            <Nav place={false} />
                        <p>{recipe.title}</p>
                        <img src={recipe.image} alt="" />
                        <p>{recipe.diets}</p>
                        <p>{recipe.healthScore}</p>
                        <p>{recipe.spoonacularScore}</p>
                        {recipe.analyzedInstructions && recipe.analyzedInstructions.length && recipe.analyzedInstructions[0].steps.map((steps,indice)=>{

                                        return <div key={indice}>  
                                                <p>{steps.number}</p>
                                                <p>{steps.step}</p>
                                                {steps.ingredients.map((name) => {
                                                    return <div key={name.id}>
                                                        <p>{name.name}</p>
                                                    </div>
                                                })}

                                            </div>
                                        
        
                        })}
                  
       
        </div>
    )
}