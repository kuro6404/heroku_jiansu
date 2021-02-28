import {combineReducers} from "redux-immutable";
import {HeaderReducer} from "../common/header/store";
import {HomeReducer} from "../pages/home/store/reducer";
import {DetailReducer} from "../pages/detail/store/reducer";
import {LoginReducer} from "../pages/login/store/reducer";
import {UserPageReducer} from "../pages/userPage/store/reducer";


export default combineReducers({
    header:HeaderReducer,
    home:HomeReducer,
    detail:DetailReducer,
    login:LoginReducer,
    userpage:UserPageReducer
})