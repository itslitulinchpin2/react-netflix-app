import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY

function getMovies(){
    return async (dispatch)=>{
       const popularMovieApi = 
       api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
        
       const topRatedApi = 
       api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)

       const upComingApi=
       api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)


       let [popularMovies,topRatedMovies,upcomingMovies] = await Promise.all([popularMovieApi,topRatedApi,upComingApi])
       //세 개의 API호출을 동시에 진행시키되,
       //세 개의 응답이 모두 올때까지만 기다린다.
       //await는 한 번만 사용하면 된다.

    //    console.log(popularMovies);
    //    console.log(topRatedMovies);
    //    console.log(upcomingMovies);

       dispatch({
        type:"GET_MOVIES_SUCCESS",
        payload:{
            popularMovies:popularMovies.data,
            topRatedMovies:topRatedMovies.data,
            upcomingMovies:upcomingMovies.data
        }
       })
     }
}

export const movieAction = {
    getMovies,
}