import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY


function getMovie(movie_id){
    return async (dispatch)=>{
        try{
            
            dispatch({type:"GET_MOVIE_DETAIL_REQUEST"})
    
        const getMovieDetailApi=
         api.get(`/movie/${movie_id}?api_key=${API_KEY}&language=en-US&page=1`)

        

        const getReviewApi=
        api.get(`/movie/${movie_id}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
        

        const getSimilarMoviesApi=
        api.get(`/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
       
        const getVideoDetailApi=
        api.get(`/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US&page=1`)
        
        let [movieDetail,movieReview,similarMovies,videoDetail]=await Promise.all([getMovieDetailApi,getReviewApi,getSimilarMoviesApi,getVideoDetailApi]);
         dispatch({
            type:"GET_MOVIE_DETAIL_SUCCESS",
            payload:{
                movieDetail:movieDetail.data,
                movieReview:movieReview.data,
                similarMovies:similarMovies.data,
                videoDetail:videoDetail.data
            }
        })
        
    }
    catch(error){
        dispatch({type:"GET_MOVIE_DETAIL_ERROR"})
    }
}
}

export const movieDetailAction={getMovie};