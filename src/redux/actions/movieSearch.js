import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY

function searchMovies(query){



    return async (dispatch)=>{

        try{
            dispatch({type:"SEARCH_MOVIES_REQUEST"})
            const searchMovieApi = 
            api.get(`/search/movie?query=${query}&api_key=${API_KEY}`)
             
            
     
            let [searchedMovieList] = await Promise.all([searchMovieApi])
          

            dispatch({
                type:"SEARCH_MOVIES_SUCCESS",
                payload:{
                    searchedMovieList:searchedMovieList.data
                }
               })

        } catch(error){
            //에러핸들링
            dispatch({type:"SEARCH_MOVIES_FAILURE"})
        } 
     }
}

export const movieSearch = {
    searchMovies
}