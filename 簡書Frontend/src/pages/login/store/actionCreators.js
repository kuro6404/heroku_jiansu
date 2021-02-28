import axios from 'axios'
import * as actionTypes from "./actionTypes";
import {message} from "antd";

export const LoginAction = (account,password) => {
    return (dispatch) => {
        axios({
            url:'https://jiansu-flask.herokuapp.com/login',
            method:"post",
            data:{
                account:account,
                password:password
            }
        })
            .then((res)=>{
                if (res.data.success === "100") {
                    const action = {
                        type: actionTypes.CHANGE_LOGIN,
                        username : res.data.username,
                        userPic : res.data.userPic,
                        userEmail : res.data.userEmail,
                        userid : res.data.userid,
                        userPostNum : res.data.userPostNum,
                        value: true
                    }
                    localStorage.setItem("username",res.data.username);
                    if (res.data.userPic){
                        localStorage.setItem("userPic",res.data.userPic);
                    }
                    else{
                        localStorage.setItem("userPic","");
                    }
                    if (res.data.userEmail){
                        localStorage.setItem("userEmail",res.data.userEmail);
                    }
                    else{
                        localStorage.setItem("userEmail","");
                    }
                    localStorage.setItem("userid",res.data.userid);
                    localStorage.setItem("userPostNum",res.data.userPostNum);
                    dispatch(action);
                }
                else{
                    message.error(res.data.message);
                }
            })
            .catch(()=>{alert('失敗')})
    }
}

export const Logout = () => (
    {
        type:actionTypes.CHANGE_LOGIN,
        value:false
    }
)

export const ChangeLogin = (username,userPic,userEmail,userid,userPostNum) => ({
    type:actionTypes.CHANGE_LOGIN,
    value:true,
    username:username,
    userPic:userPic,
    userEmail:userEmail,
    userid:userid,
    userPostNum:userPostNum
})