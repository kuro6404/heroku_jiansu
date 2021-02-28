import * as actionType from "./actionTypes";


const defaultState = {
    articleList:[],
    eventList:[]
}

export const UserPageReducer = (state = defaultState,action) => {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type){
        case actionType.GET_ARTICLE:
        {
            newState.articleList = action.articleList;
            newState.eventList = action.eventList;
            return newState;
        }
        default:
            return state;
    }
}