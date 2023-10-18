let initialState={
    movieReceivedDetail:{},
    movieReviewDetail:{},
    similarMovies:{},
    videoDetail:{},
    loading:true
}

function movieDetailReducer(state=initialState,action){
    let{type,payload}=action;
    if(type==="GET_MOVIE_DETAIL_SUCCESS"){
        return{...state,
            movieReceivedDetail:payload.movieDetail,
            movieReviewDetail:payload.movieReview,
            similarMovies:payload.similarMovies,
            videoDetail:payload.videoDetail,
            loading:false}

    } else if (type==="GET_MOVIE_DETAIL_REQUEST"){
        return{...state,loading:true}
    } else if (type==="GET_MOVIE_DETAIL_ERROR"){
        return{...state,loading:false}
    }
    return {...state}
}

export default movieDetailReducer;