import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import movieDetailReducer from "./movieDetailReducer";
import searchMovieReducer from "./movieSearch";
export default combineReducers({
    movie:movieReducer,
    detail:movieDetailReducer,
    searched:searchMovieReducer
})