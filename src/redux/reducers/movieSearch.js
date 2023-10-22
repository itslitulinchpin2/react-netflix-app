let initialState={
    searchedMovieList:[],
    loading:false
}

function searchMovieReducer(state=initialState,action){
    let{type,payload}=action;
    if(type==="SEARCH_MOVIES_REQUEST"){
        return{...state,loading:true}
    }
    else if(type==="SEARCH_MOVIES_SUCCESS"){
        return {...state,
            searchedMovieList:payload.searchedMovieList,
            loading:false}
    } else if (type==="SEARCH_MOVIES_FAILURE"){
        return{...state,loading:false}
    }
    return {...state}
}

export default searchMovieReducer;