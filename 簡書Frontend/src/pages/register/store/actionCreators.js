import axios from "axios";
import * as actionTypes from './actionTypes'
import {message} from "antd"

export const RegisterAction = (username,account,password,history) => {
    return (dispatch,getState)=>{
        axios({
            method:"post",
            url:"https://jiansu-flask.herokuapp.com/register",
            data:{
                username:username,
                account:account,
                password:password
            }
        }).then((res)=>{
            if(res.data.success === "100") {
                history.push("/login");
                message.success("成功");
            }
            else {
                message.error(res.data.message);
            }
        }).catch(()=>{
            message.error("失敗");
        })
    }
}
