export const search = (recipe) =>{
    return  function(dispatch){
        return fetch(`http://localhost:3001/recipes?name=${recipe}`)
        .then(data => data.json())
        .then(data => dispatch({
            type: 'GET_RECIPES',
            payload : data
        }))
    }
}
export const getRecipes = () =>{
    return  function(dispatch){
        return fetch(`http://localhost:3001/recipes`)
        .then(data => data.json())
        .then(data => dispatch({
            type: 'GET_RECIPES',
            payload : data
        }))
    }
}