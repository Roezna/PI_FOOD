import { useSelector } from "react-redux";/* 
import { Redirect } from "react-router-dom"; */
import Nav from "./Nav";
import Footer from "./Footer";
import '../styles/Recipe.css'/* 
import { useEffect, useState } from "react"; */
export default function Recipe(){

    const recipe = useSelector(state => state.recipeDetail) 
     const load = useSelector(state => state.loading)
   
  
    function createMarkup() {
        return {__html: recipe.summary};
      }

    return(
        
        <div className={load ? 'carga' : 'containerDetail'}>
         <Nav place={false} />
         {load && <div className='loading'><p className='logito'><i>MORE...</i></p></div>} 
        
             {!load && recipe.length < 1 && <div className='errorPage'><p>You have reloaded the page and the data on this page has been lost. Go back to Home</p></div>}
             <div id='divTitle'>
            {!load && recipe.title && <span id='titleD'>{recipe.title}</span>}
            </div>
            <div className='recipeDetail'>
                <div className='division1'>
                {!load &&  <img id='imgD' src={recipe.image} alt="" />}
                   {!load &&recipe.diets && <p className='subtitle'>Type <span className='middle'>of</span> diet</p>}
                    <div id='typeD'>
                    {recipe.diets && recipe.diets.map((elemento)=>{ 
                        return <div key={elemento}><span className='dietsD' ><i>{elemento},</i></span></div>
                    })}
                    </div>
                    
                <div id='puntuation'>
                   {!load && recipe.healthScore  > 0 &&   <span className='subtitle'>Health <span className='middle'>score:</span> {recipe.healthScore}</span>}
                   {!load && recipe.spoonacularScore > 0 && <span className='subtitle'> Spoonacular <span className='middle'>score:</span> {recipe.spoonacularScore}</span>}
                
                    </div>
                </div>

                
             
                  
                   <div className='division2'> 
                   <div className='resume'>
                   {!load && recipe.summary  && <p className='subtitle'>Re<span className='color'>su</span>me</p>} 
                   <span dangerouslySetInnerHTML={createMarkup()} className='summary'></span>
                   </div>
                   {!load && recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 &&
                   <div className='divSteps'>
                   <p className='subtitle'>Step <span className='middle'> by </span> Step</p>
                    {!load && recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 && recipe.analyzedInstructions[0].steps.map((steps,indice)=>{
                                 
                        return <div key={indice} className='steps'> 
                                <p><span className='itemStep'>{steps.number})</span> {steps.step}</p>

                                </div>
                                        
        
                        })}
                </div>}
                {!load && recipe.steps && recipe.steps.length > 1 &&
                   <div className='divSteps'>
                   <p className='subtitle'>Step <span className='middle'> by </span> Step</p>
                    {!load && recipe.steps && recipe.steps.length > 0 && recipe.steps.map((steps,indice)=>{
                                 if(steps === '') return 

                        return <div key={indice} className='steps'> 
                                <p><span className='itemStep'>{(indice+1)+''})</span> {steps}</p>
                        
                                </div>
                                
                                        
        
                        })}
                </div>}
                </div>
                
            </div>
                  
       <Footer />
        </div>
    )
}