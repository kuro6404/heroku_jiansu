import axios from 'axios'
import * as actionTypes from './actionTypes'
import {fromJS} from "immutable";

export const getDetail = (page_id) => {
    return (dispatch) => {
        axios.get('https://jiansu-flask.herokuapp.com/detail?id=' + page_id).then((res)=>{
            const action = {
                type: actionTypes.GET_DETAIL,
                title: fromJS(res.data.title),
                content:fromJS(res.data.content),
            }
            dispatch(action);
        })
    }
}