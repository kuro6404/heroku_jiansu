import axios from "axios"
import * as actionTypes from "./actionTypes"
import {message} from "antd";

export const postArticle = (username,title,image,content,setTitle,setPic,setContent) => {
    return (dispatch)=>{
        const data = new FormData();
        data.append("title",title);
        data.append("image",image);
        data.append("content",content);
        data.append("username",username);
        axios({
            method:"post",
            url:"https://jiansu-flask.herokuapp.com/Article",
            data:data
        }).then(()=>{
            message.success("成功");
            setContent();
            setPic();
            setTitle();
        }).catch(()=>{
            message.error("失敗");
        })

    }
}