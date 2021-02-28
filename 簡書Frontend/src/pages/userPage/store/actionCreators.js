import axios from "axios"
import {message} from "antd";
import * as actionTypes from "./actionTypes";

export const getUserPage = (username,userid,setUsername,setUserPic,setUserPostNum,setThumb,setUserFans,setFollowed,setUserFollow) => {
    return (dispatch)=>{
        axios.get("https://jiansu-flask.herokuapp.com/userPage?userid=" + userid + "&currentUser=" + username)
            .then((res)=>{
                const action = {
                    type:actionTypes.GET_ARTICLE,
                    articleList:res.data.articleList,
                    eventList:res.data.eventList
                }
                dispatch(action);

                setUsername(res.data.username);
                setUserPic(res.data.userPic);
                setUserPostNum(res.data.userPost);
                setThumb(res.data.userThumb);
                setUserFans(res.data.userFans);
                setFollowed(res.data.alreadyFollow);
                setUserFollow(res.data.userFollow);
            }).catch(()=>{
                message.error("失敗")
        })
    }
}

export const deleteArticle = (postid) => {
    return ()=>{
        axios({
            method:"delete",
            url:"https://jiansu-flask.herokuapp.com/Article",
            data:{
                postid:postid,
            }
        }).then(()=>{
            message.success("刪除成功");
        }).catch(()=>{
            message.error("失敗");
        })
    }
}

export const followUser = (username,targetUserid,follow,setFollowed,setUserFans) => {
    return ()=>{
        axios({
            method:"post",
            url:"https://jiansu-flask.herokuapp.com/follow",
            data:{
                username:username,
                targetUserid:targetUserid,
                follow:follow
            }
        }).then((res)=>{
            if(res.data.result === true){
                setFollowed(true);
                setUserFans(pre => pre+1);
            }
            else{
                setFollowed(false);
                setUserFans(pre => pre-1);
            }
        }).catch(()=>{
            message.error("失敗");
        })
    }
}