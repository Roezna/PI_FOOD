
export const search = (recipe) =>{
    return  function(dispatch){
        return fetch(`http://localhost:3001/recipes?name=${recipe}`)
        .then(data => data.json())
        .then(data => dispatch({
            type: 'GET_RECIPES',
            payload : {
                data : data,
                recipe : recipe
            }
        }))
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
    return  function(dispatch){
        return fetch(`http://localhost:3001/recipes/${id}`)
        .then(data => data.json())
        .then(data => {
            dispatch({
            type: 'GET_RECIPE_DETAIL',
            payload : data
        })
    }
    )
    }
}

export const  createRecipe = (obj) => {
            
         return function(dispatch){

            const formdata = new FormData()
            formdata.append('image', obj.image)
            formdata.append('name', obj.name)
            formdata.append('resume', obj.resume)
            formdata.append('healthScore', obj.healthScore)
            formdata.append('spoonScore', obj.spoonScore)
            formdata.append('diets', obj.diets)
            formdata.append('steps', obj.steps)

        return fetch(`http://localhost:3001/recipe`, {
            method: 'POST',
            body: formdata
         })
        .then(res => res.json())
        .then(res => {
            dispatch({
            type: 'CREATE_RECIPE',
            payload : {
                message : res.message,
                recipe : res.data
            }
        })
    })
    
    }
    
}

export const loading = () => {
    return{
        type : 'LOADING'
    }
}

export const orderRecipes = (op) => {
    return{
        type : 'ORDER',
        payload: op
    }
}

export const filterRecipe = (type) => {
    return {
             type: 'FILTER',
            payload :  type

    }

}