import axios from 'axios'
import {message} from "antd";

export const getArticle = (username,idStr,setTitle,setPic,setContent,setAuthor,setTime,setThumb,setID,setAlreadyThumb,setComment) => {
    return ()=>{
        axios.get("https://jiansu-flask.herokuapp.com/Article?postid=" + idStr + "&username=" + username)
            .then((res)=>{
                setTitle(res.data.postTitle);
                setPic(res.data.postPic);
                setContent(res.data.postContent);
                setAuthor(res.data.postAuthor);
                setTime(res.data.postTime);
                setThumb(res.data.postThumb);
                setID(res.data.postid);
                setAlreadyThumb(res.data.like);
                setComment(res.data.comment);
            }).catch(()=>{
                message.error("失敗")
        })
    }
}

export const ThumbArticle = (username,articleid,setThumb,setAlreadyThumb,thumb) => {
    return ()=>{
        axios({
            method:"post",
            url:"https://jiansu-flask.herokuapp.com/thumbArticle",
            data:{
                username:username,
                articleid:articleid,
                thumb:thumb
            }
        }).then((res)=>{
            if(res.data.result === "add"){
                setThumb(pre => pre + 1);
                setAlreadyThumb(true);
            }
            else{
                setThumb(pre => pre - 1);
                setAlreadyThumb(false);
            }
        }).catch(()=>{
            message.error("失敗")
        })
    }
}

export const addComment = (userid,content,postid,comment,setComment) => {
    return ()=>{
        const comment_temp = [...comment]
        axios({
            method:"post",
            url:"https://jiansu-flask.herokuapp.com/Comment",
            data:{
                userid:userid,
                content:content,
                postid:postid,
            }
        }).then((res)=>{
            comment_temp.unshift(
                {
                    "username":res.data.username,
                    "userPic":res.data.userPic,
                    "content":content,
                    "time":res.data.time,
                    "userid":res.data.userid,
                    "commentid":res.data.commentid
                }
                )
            setComment(comment_temp);
            message.success("發佈成功");
        }).catch(()=>{
            message.error("失敗");
        })
    }
}

export const deleteComment = (commentid,comment,setComment,userid)=>{
    return ()=>{
        axios({
            method:"delete",
            url:"https://jiansu-flask.herokuapp.com/Comment",
            data:{
                commentid:commentid,
                userid:userid
            }
        }).then((res)=>{
            const comment_temp = [...comment];
            for (let i=0;i<comment_temp.length;i++){
                if (comment_temp[i].commentid == commentid){
                    comment_temp.splice(i,1);
                    break;
                }
            }
            setComment(comment_temp);
            message.success("刪除成功");
        }).catch(()=>{
            message.error("失敗");
        })
    }
}

export const editcomment = (editContent,commentid,setContent,setTime,userid) => {
    return ()=>{
        axios({
            method:"put",
            url:"https://jiansu-flask.herokuapp.com/Comment",
            data:{
                editContent:editContent,
                commentid:commentid,
                userid:userid
            }
        }).then((res)=>{
            setContent(editContent);
            setTime(res.data.time);
            message.success("編輯成功!");
        }).catch(()=>{
            message.error("編輯失敗");
        })
    }
}
