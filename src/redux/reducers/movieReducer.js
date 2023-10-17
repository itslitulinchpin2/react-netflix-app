let initialState={
    popularMovies:{},
    topRatedMovies:{},
    upcomingMovies:{},
    loading:true,
    genreList:[]
}

function movieReducer(state=initialState,action){
    let{type,payload}=action;
    if(type==="GET_MOVIES_REQUEST"){
        return{...state,loading:true}
    }
    else if(type==="GET_MOVIES_SUCCESS"){
        return {...state,
            popularMovies:payload.popularMovies, 
            topRatedMovies:payload.topRatedMovies,
            upcomingMovies:payload.upcomingMovies,
            genreList:payload.genreList,
            loading:false}
    } else if (type==="GET_MOVIES_FAILURE"){
        return{...state,loading:false}
    }
    return {...state}
}

export default movieReducer;