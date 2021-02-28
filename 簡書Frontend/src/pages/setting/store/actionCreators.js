import axios from 'axios'
import * as actionTypes from "./actionTypes";
import {message} from "antd";

export const changeSetting = (username,userPic,userEmail,userNewName) => {
    return (dispatch,getState)=>{
        const data = new FormData();
        data.append("username",username);
        data.append("userPic",userPic);
        data.append("userEmail",userEmail);
        data.append("userNewName",userNewName);
        axios({
            method:"post",
            url:"https://jiansu-flask.herokuapp.com/changeUserSetting",
            data:data
        }).then((res)=>{
            if (res.data.success === "400"){
                message.error(res.data.message);
            }
            else{
                const action = {
                type:actionTypes.CHANGE_USER_SETTING,
                userPic:res.data.userPic,
                userEmail:res.data.userEmail,
                userNewName:res.data.userNewName
                }
                dispatch(action);
                localStorage.setItem("username",res.data.userNewName);
                if (res.data.userPic){
                    localStorage.setItem("userPic",res.data.userPic);
                }
                localStorage.setItem("userEmail",res.data.userEmail);
                message.success("保存成功");
            }
        }).catch(()=>{
            message.error("失敗")
        })
    }
}