import { combineReducers } from "redux";
import { allReducers } from "./allReducers";

const reducers = combineReducers({
    allReducers: allReducers,
})

export default reducers;