import { useSelector } from "react-redux";
import Nav from "./Nav";
import '../styles/Recipe.css'
export default function Recipe(){
    const recipe = useSelector(state => state.recipeDetail)  

    return(
        <div className='containerDetail'>
            <Nav place={false} />
            <div id='divTitle'>
            <span id='titleD'>{recipe.title}</span>
            </div>
            <div className='recipeDetail'>
                <div className='division1'>
                    <img id='imgD' src={recipe.image} alt="" />
                    <p className='subtitle'>Type <span className='middle'>of</span> diet</p>
                    <div id='typeD'>
                    {recipe.diets.map((elemento)=>{ 
                        return <div key={elemento}><span className='dietsD' ><i>{elemento},</i></span></div>
                    })}
                    </div>
                    <div id='puntuation'>
                    <span className='subtitle'>Health <span className='middle'>score:</span> {recipe.healthScore}</span>
                    <span className='subtitle'> Spoonacular <span className='middle'>score:</span> {recipe.spoonacularScore}</span>
                    </div>
                </div>
             
                   {recipe.analyzedInstructions.length > 0 &&
                   <div className='division2'> 
                   <p className='subtitle'>Step <span className='middle'> by </span> Step</p>
                    {recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && recipe.analyzedInstructions[0].steps.map((steps,indice)=>{
                                 
                        return <div key={indice} className='steps'> 
                                <p><span className='itemStep'>{steps.number})</span> {steps.step}</p>

                                </div>
                                        
        
                        })}
                </div>}
            </div>
                  
       
        </div>
    )
}