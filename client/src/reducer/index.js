const initialState = {
    allRecipes : [],
    recipesLoaded : null,
    recipeDetail : [],
    types : null,
    searching : '',
    status : '',
    loading : false,
    recipesFilter : null
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
                recipeDetail : [],
                recipesFilter : null
            };
        case 'GET_RECIPES' :
            return{
                ...state,
                searching : action.payload.recipe,
                recipesLoaded : action.payload.data,
                recipesFilter : action.payload.data,
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
                allRecipes : [action.payload.recipe, ...state.allRecipes],
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
                        recipesLoaded : state.recipesLoaded !== null ? state.recipesLoaded.sort(function(a, b){
                            if(a.title < b.title) return -1
                            else if(a.title > b.title) return 1
                            else return 0
                        }) : null,
                        recipesFilter : state.recipesFilter !== null ? state.recipesFilter.sort(function(a, b){
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
                        recipesLoaded : state.recipesLoaded !== null ? state.recipesLoaded.sort(function(a, b){
                            if(a.title < b.title) return 1
                            else if(a.title > b.title) return -1
                            else return 0
                        }) : null,
                        recipesFilter : state.recipesFilter !== null ? state.recipesFilter.sort(function(a, b){
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
                        recipesLoaded : state.recipesLoaded !== null ? state.recipesLoaded.sort(function(a, b){
                            if(a.healthScore < b.healthScore) return 1
                            else if(a.healthScore > b.healthScore) return -1
                            else return 0
                        }) : null,
                        recipesFilter : state.recipesFilter !== null ? state.recipesFilter.sort(function(a, b){
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
                        recipesLoaded : state.recipesLoaded !== null ? state.recipesLoaded.sort(function(a, b){
                            if(a.spoonacularScore < b.spoonacularScore) return 1
                            else if(a.spoonacularScore > b.spoonacularScore) return -1
                            else return 0
                        }) : null,
                        recipesFilter : state.recipesFilter !== null ? state.recipesFilter.sort(function(a, b){
                            if(a.spoonacularScore < b.spoonacularScore) return 1
                            else if(a.spoonacularScore > b.spoonacularScore) return -1
                            else return 0
                        }) : null

                    }
                }
             }
             case 'FILTER' :{

                let filter = []
                  
                state.recipesLoaded !== null &&  state.recipesLoaded !== 'error'
                ?  filter = state.recipesLoaded.filter(diet => diet.diets.includes(action.payload))
                : filter = state.allRecipes.filter(diet => diet.diets.includes(action.payload))

               return { 
                   ...state ,
                 recipesFilter : filter
               }
            }

            case 'TYPES' :{
               return { 
                   ...state ,
                 types : action.payload
               }
            }

        default : return state;
    }
}

