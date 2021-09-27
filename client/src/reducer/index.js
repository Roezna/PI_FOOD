const initialState = {
    allRecipes : [],
    recipesLoaded : null,
    recipeDetail : [],
    searching : '',
    status : '',
    loading : false
};

export default function Reducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_RECIPES' :
            return{
                ...state,
                allRecipes : action.payload.condition === true ? action.payload.data : state.allRecipes,
                recipesLoaded : null,
                searching : '',
                status : '',
                loading : false,
                recipeDetail : []
            };
        case 'GET_RECIPES' :
            return{
                ...state,
                searching : action.payload.recipe,
                recipesLoaded : action.payload.data,
                loading : false
                }
            

        case 'GET_RECIPE_DETAIL' :
            return{
                ...state,
                loading : false,
                recipeDetail : action.payload,
                
            };

            case 'CREATE_RECIPE' :
            return{
                ...state,
                allRecipes : [...state.allRecipes, action.payload.recipe],
                status : action.payload.message,
                recipeDetail :  action.payload.recipe
           };
           case 'LOADING' :{
              return { ...state ,
               loading : true
              }
           }
           case 'ORDER' : {
               if(action.payload === 'asc'){

                   return {
                        ...state,
                        allRecipes : state.allRecipes.sort(function(a, b){
                            if(a.title < b.title) return -1
                            else if(a.title > b.title) return 1
                            else return 0
                        }),
                        recipesLoaded : state.recipesLoaded.length > 0 ? state.recipesLoaded.sort(function(a, b){
                            if(a.title < b.title) return -1
                            else if(a.title > b.title) return 1
                            else return 0
                        }) : null
                   }
                }
                if(action.payload === 'desc'){

                    return {
                         ...state,
                         allRecipes : state.allRecipes.sort(function(a, b){
                            if(a.title < b.title) return 1
                            else if(a.title > b.title) return -1
                            else return 0
                        }),
                        recipesLoaded : state.recipesLoaded.length > 0 ? state.recipesLoaded.sort(function(a, b){
                            if(a.title < b.title) return 1
                            else if(a.title > b.title) return -1
                            else return 0
                        }) : null

                    }
                }
                if(action.payload === 'health'){

                    return {
                         ...state,
                         allRecipes : state.allRecipes.sort(function(a, b){
                            if(a.healthScore < b.healthScore) return 1
                            else if(a.healthScore > b.healthScore) return -1
                            else return 0
                        }),
                        recipesLoaded : state.recipesLoaded.length > 0 ? state.recipesLoaded.sort(function(a, b){
                            if(a.healthScore < b.healthScore) return 1
                            else if(a.healthScore > b.healthScore) return -1
                            else return 0
                        }) : null

                    }
                }
                if(action.payload === 'spoon'){

                    return {
                         ...state,
                         allRecipes : state.allRecipes.sort(function(a, b){
                            if(a.spoonacularScore < b.spoonacularScore) return 1
                            else if(a.spoonacularScore > b.spoonacularScore) return -1
                            else return 0
                        }),
                        recipesLoaded : state.recipesLoaded.length > 0 ? state.recipesLoaded.sort(function(a, b){
                            if(a.spoonacularScore < b.spoonacularScore) return 1
                            else if(a.spoonacularScore > b.spoonacularScore) return -1
                            else return 0
                        }) : null

                    }
                }
             }
             case 'FILTER' :{

            const filterApi = state.allRecipes.filter(elemento => elemento.diets.includes(action.payload.diet))
                return { ...state ,
                 recipesLoaded :  filterApi
                }
             }

        default : return state;
    }
}

