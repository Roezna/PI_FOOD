import Card from './Card'
import {useSelector, useDispatch} from 'react-redux'
import '../styles/Cards.css'
import { useState } from 'react'
import { orderRecipes, filterRecipe, getRecipes } from '../actions'

export default function Cards(){


   let recipes = useSelector(state => state.recipesLoaded)
   let searching = useSelector(state => state.searching)
   let allRecipes = useSelector(state => state.allRecipes)
   let filtered = useSelector(state => state.recipesFilter)
   let types = useSelector(state => state.types)
   const dispatch = useDispatch()
   const [change, setChange] = useState(false)


   const [currentPage, setCurrentPage] = useState(0);
   
   const [count, setCount] = useState(1)

   const filteredRecipes = (array) => {
       return array.slice(currentPage,currentPage + 9)
   }

   const next = (e) =>{
        e.preventDefault();
        if((filtered !== null && filtered.length-1)>= currentPage + 9){
            setCurrentPage(currentPage + 9)
            setCount(count + 1)
            return
        }
        else{
             if(allRecipes.length >= currentPage + 9 && filtered === null){
                setCurrentPage(currentPage + 9)
                setCount(count + 1)
                return
             }
        }

   }

   const prev = (e) =>{
    e.preventDefault();
    if(currentPage < 1) return
    setCurrentPage(currentPage - 9)
    setCount(count - 1)

}
const order = async (e) => {
    e.preventDefault();
    if(e.target.value === 'default'){
        dispatch(getRecipes(false))
    }
    else{
    setChange(false)
    await dispatch(orderRecipes(e.target.value))
    setChange(true)
}
}

const filter = async (e) =>{
    e.preventDefault();
    if(e.target.value === 'default'){
        dispatch(getRecipes(false))
    }
    else{
   await dispatch(filterRecipe(e.target.value))
    setCurrentPage(0)
    setCount(1)
}
}


    return(
        <div className='contenedor'>    
            
        <div className='POF'>
        
        <div className='select'>
            <select onChange={(value) => order(value)} className='elSelect'>
            <option value="default">Order (Default)</option>
            <option className='option' value='asc' >Name (asc)</option>
            <option className='option' value='desc' >Name (desc)</option>
            <option className='option' value='health' >M??x. Health Score</option>
            <option className='option' value='spoon' >M??x. Spoonacular Score</option>
            </select>
            
        </div>
        {(allRecipes || filtered !== null) && 
           <div className='pagination'>
             <button className='btn-page' onClick={(e) => prev(e)}>{'<'} Prev</button> 
             <span className='dataPagination'>Page: {count}/{Math.ceil(filtered === null ? allRecipes.length/9 : filtered.length/9)}</span>
             <button className='btn-page' onClick={(e) => next(e)}>Next {'>'} </button>
             </div> }

             <div className='select'>
          {(allRecipes || filtered !== null) &&   <select onChange={(value) => filter(value)} className='elSelect'>
            <option value="default">Filter (Default)</option>
            {types !== null && types.map((elemento)=>{
                return <option key={elemento.name} className='option' value={elemento.name}>{elemento.name}</option>
            })}
            </select>}
            
        </div>
      
        </div>

        {searching !== '' && recipes === 'error' &&
            <div className='searchBox'>
                <p className='badResult'>Results not found for: <span className='resultData'>"{searching}"</span></p>
            </div>} 

        {searching !== '' && recipes !== 'error' &&
            <div className='searchBox'>
                <span className='goodResult'>Results for: <span className='resultData'>"{searching}"</span></span>
            </div>}

        <div id='divCards'>

            {filtered !== null && filtered.length === 0 && 
            <div className='unFilter'>
                <span className='textUnFilter'>Results not found for this filter</span>
            </div>}
            
            {filtered === null && filteredRecipes(allRecipes).map(function(recipe){
               return <Card 
               key={recipe.id}
               image={recipe.image}
               title={recipe.title}
               diet={recipe.diets}
               id={recipe.id}
               />
            })}



            {filtered !== null && recipes !== 'error' && filtered.length > 0  && filteredRecipes(filtered).map(function(recipe){
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