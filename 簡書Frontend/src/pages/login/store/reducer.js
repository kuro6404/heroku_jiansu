import * as actionType from "./actionTypes";
import {fromJS} from 'immutable'
import * as actionTypes from "./actionTypes";
import {CHANGE_USER_SETTING} from "../../setting/store/actionTypes";

const defaultState = {
    login : false,
    username : "",
    userPic : "",
    userEmail : "",
    userid:"",
    userPostNum:0
}

export const LoginReducer = (state = defaultState,action)=>{
    const newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case actionTypes.CHANGE_LOGIN:
        {
            newState.login = action.value;
            newState.username = action.username;
            newState.userPic = action.userPic;
            newState.userEmail = action.userEmail;
            newState.userid = action.userid;
            newState.userPostNum = action.userPostNum;
            return newState;
        }
        case CHANGE_USER_SETTING:
        {
            if(action.userPic){
                newState.userPic = action.userPic;
            }
            newState.userEmail = action.userEmail;
            newState.username = action.userNewName;
            return newState;
        }
        default:
            return state;
    }
}
