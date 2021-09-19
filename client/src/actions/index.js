export const search = (recipe) =>{
    return  {
            type: 'GET_RECIPES',
            payload : recipe
            }
}
export const getRecipes = (condition) =>{
    if(condition){
    return  function(dispatch){
        return fetch(`http://localhost:3001/recipes`)
        .then(data => data.json())
        .then(data => dispatch({
            type: 'GET_ALL_RECIPES',
            payload :{
            data :data,
             condition : condition
            }

        }))
    }
}
else{
    return {
        type: 'GET_ALL_RECIPES',
        payload :{
             condition : condition
        }
    }
}
    
 
}
export const getRecipeDetail = (id) =>{
    return  {
            type: 'GET_RECIPE_DETAIL',
            payload : id
    }
}