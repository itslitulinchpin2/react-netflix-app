import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import reducer2 from "./reducer2";

export default combineReducers({
    movie:movieReducer,
    reducer2:reducer2
})