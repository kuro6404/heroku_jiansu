import * as actionType from "./actionTypes";
import {fromJS} from 'immutable'

const  defaultState = {
    focus:false,
    list:[],
    page:0,
    totalPage:0,
    mouse:false
}

export const HeaderReducer = (state = defaultState,action)=>{
    const newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case actionType.CHANGE_FOCUS:
        {
            newState.focus = action.value;
            return newState;
        }
        case actionType.CHANGE_LIST:
        {
            newState.list = action.data;
            newState.totalPage = action.totalPage;
            return newState;
        }
        case actionType.CHANGE_MOUSE:
        {
            newState.mouse = action.value;
            return newState;
        }
        case actionType.CHANGE_PAGE:
        {
            newState.page = action.page;
            return newState;
        }
        default:
            return state;
    }
}