let initialState={
    popularMovies:{},
    topRatedMovies:{},
    upcomingMovies:{}
}

function movieReducer(state=initialState,action){
    let{type,payload}=action;
    if(type==="GET_MOVIES_SUCCESS"){
        return {...state,
            popularMovies:payload.popularMovies, 
            topRatedMovies:payload.topRatedMovies,
            upcomingMovies:payload.upcomingMovies}
    }
    return {...state}
}

export default movieReducer;