import Card from './Card'
import {useSelector, useDispatch} from 'react-redux'
import '../styles/Cards.css'
import { useState } from 'react'
import { orderRecipes, filterRecipe, getRecipes } from '../actions'

export default function Cards(){


   let recipes = useSelector(state => state.recipesLoaded)
   let searching = useSelector(state => state.searching)
   let allRecipes = useSelector(state => state.allRecipes)
   const dispatch = useDispatch()
   const [change, setChange] = useState(false)

   const types = ['gluten free', 'ketogenic', 'vegetarian', 'lacto ovo vegetarian',
'vegan', 'pescetarian', 'paleo', 'primal', 'whole30', 'dairy free']


   const [currentPage, setCurrentPage] = useState(0);
   
   const [count, setCount] = useState(1)

   const filteredRecipes = (array) => {
       return array.slice(currentPage,currentPage + 9)
   }

   const next = (e) =>{
        e.preventDefault();
        if((recipes !== null && recipes.length)>= currentPage + 9){
            setCurrentPage(currentPage + 9)
            setCount(count + 1)
            return
        }
        else{
             if(allRecipes.length >= currentPage + 9 && recipes === null){
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
    setChange(false)
   await dispatch(filterRecipe(e.target.value))
    setChange(true)
    setCurrentPage(0)
    setCount(1)
}
}


    return(
        <div className='contenedor'>


           
            {searching !== '' && recipes === 'error' &&
            <div className='searchBox'>
                <p className='badResult'>Results not found for: <span className='resultData'>"{searching}"</span></p>
            </div>}     
            
        <div className='POF'>
        
        <div className='select'>
            <select onChange={(value) => order(value)} className='elSelect'>
            <option value="default">Order (Default)</option>
            <option className='option' value='asc' >Name (asc)</option>
            <option className='option' value='desc' >Name (desc)</option>
            <option className='option' value='health' >Máx. Health Score</option>
            <option className='option' value='spoon' >Máx. Spoonacular Score</option>
            </select>
            
        </div>
        {(allRecipes || recipes !== null) && 
           <div className='pagination'>
             <button className='btn-page' onClick={(e) => prev(e)}>{'<'} Prev</button> 
             <span className='dataPagination'>Page: {count}/{Math.ceil(recipes === null || recipes === 'error' ? allRecipes.length/9 : recipes.length/9)}</span>
             <button className='btn-page' onClick={(e) => next(e)}>Next {'>'} </button>
             </div> }

             <div className='select'>
          {searching === '' &&   <select onChange={(value) => filter(value)} className='elSelect'>
            <option value="default">Filter (Default)</option>
            {types.map((elemento)=>{
                return <option key={elemento} className='option' value={elemento}>{elemento}</option>
            })}
            </select>}

            {searching !== '' && recipes !== 'error' &&
            <div className='searchBox'>
                <span className='goodResult'>Results for: <span className='resultData'>"{searching}"</span></span>
            </div>}
            
        </div>
      
        </div>

        <div id='divCards'>
            
            {(recipes === null || recipes === 'error')  && filteredRecipes(allRecipes).map(function(recipe){
               return <Card 
               key={recipe.id}
               image={recipe.image}
               title={recipe.title}
               diet={recipe.diets}
               id={recipe.id}
               />
            })}
        
          {recipes !== 'error' && recipes !== null  && filteredRecipes(recipes).map(function(recipe){
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