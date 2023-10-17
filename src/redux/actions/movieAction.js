import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY
function getMovies(){
    return async (dispatch)=>{
       const popularMovieApi = await api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)

     }
}

export const movieAction = {
    getMovies,
}