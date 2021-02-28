import * as actionType from "./actionTypes";
import axios from 'axios'
import {fromJS} from "immutable";

export const changeFocus = (focus) => ({
    type:actionType.CHANGE_FOCUS,
    value:focus
})

export const changeMouse = (mouse) => ({
    type:actionType.CHANGE_MOUSE,
    value : mouse
})

export const changePage = (page,limit,spinIcon) => {
    return(dispatch) => {
        console.log(spinIcon.style.transform)
        let original = spinIcon.style.transform.replace(/[^0-9]/ig,'');
        if(original){
            original = parseInt(original,10);
        }
        else{
            original = 0
        }
        spinIcon.style.transform = 'rotate(' + (original + 360) + 'deg)';
        if(page == limit-1){
            dispatch({type:actionType.CHANGE_PAGE,page:0})
        }
        else{
            dispatch({type:actionType.CHANGE_PAGE,page:page+1})
        }
    }
}

export const changeList = (data,limit) =>({
    type:actionType.CHANGE_LIST,
    data:data,
    totalPage:Math.ceil(data.length / limit)
})


export const getList = (limit) => {
    return (dispatch)=>{
        axios.get('/api/headerList.json')
            .then((res)=>{
                const action = changeList(res.data.data,limit);
                dispatch(action);
            }
            )
    }
}


export const changeScroll = (stat) =>(
    {
        type:actionType.CHANGE_SCROLL,
        value:stat
    }
)
