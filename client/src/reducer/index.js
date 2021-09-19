const initialState = {
    allRecipes : [],
    recipesLoaded : [],
    recipeDetail : [],
    searching : ''
};

export default function Reducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_RECIPES' :
            return{
                ...state,
                allRecipes : action.payload.condition === true ? action.payload.data : state.allRecipes,
                recipesLoaded : [],
                searching : ''
            };
        case 'GET_RECIPES' :
            if(action.payload === ''){
                return{
                    ...state,
                    searching : action.payload,
                    recipesLoaded : []
                }
            }
            else {
            return{
                ...state,
                searching : action.payload,
                recipesLoaded : state.allRecipes.filter(elemento => {
                    let receta = elemento.title.toLowerCase();
                    let busqueda = action.payload.toLowerCase();
                     return receta.includes(busqueda) 
                    })}
                }
            

        case 'GET_RECIPE_DETAIL' :
            return{
                ...state,
                recipeDetail : state.allRecipes.find(elemento => elemento.id === action.payload)
            };

        default : return state
    }
}

