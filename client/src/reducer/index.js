const initialState = {
    recipesLoaded : [],
    all_recipes : []
};

export default function Reducer(state = initialState, action){
    switch(action.type){
        case 'GET_RECIPES' :
            return{
                ...state,
                recipesLoaded : action.payload
            };

        default : return state
    }
}

