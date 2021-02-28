import * as actionTypes from "./actionTypes";
import axios from 'axios'
import {fromJS} from "immutable";
import {message} from "antd";

export const InitialHomePage = () => {
    return (dispatch)=>{
        axios.get('https://jiansu-flask.herokuapp.com/InitPage').then((res)=>{
            const action = {
                type:actionTypes.INIT_HOME,
                topicList: res.data.topicList,
                articleList:res.data.articleList1,
                recommendList:res.data.recommendList,
            };
            dispatch(action);
        })
        .catch(()=>{
            //alert('失敗');
        })

    }
}

export const getMoreList = () => {
    return (dispatch,getState) => {
        const state_js = getState().toJS();
        const page = state_js.home.articlePage + 1;
        axios.get('https://jiansu-flask.herokuapp.com/getMoreList/' + page).then((res)=>{
            const action = {
                type:actionTypes.ADD_LIST,
                list:res.data.list,
                page:getState().get('home').articlePage+ 1,
            }
            dispatch(action);
        })
    }
}

export const getWriter = () => {
    return (dispatch)=>{
        axios.get("https://jiansu-flask.herokuapp.com/getWriter")
            .then((res)=>{
                const action = {
                    type:actionTypes.UPDATE_WRITER,
                    recommendWriter: res.data.writer
                }
                dispatch(action);
            }).catch(()=>{
                message.error("失敗");
        })
    }
}

