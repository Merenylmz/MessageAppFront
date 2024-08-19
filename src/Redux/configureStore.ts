import {combineReducers} from "redux";
import AuthReducer from "./Reducers/Auth.reducer";

const reducers = combineReducers({
    auth: AuthReducer
});

export default reducers;