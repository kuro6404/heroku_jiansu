import React, {useEffect,useState,Fragment} from "react"
import {
    ActionWords,
    ActionWrapper,
    ArticleWrapper,
    Button, CommentList,
    CommentTitle,
    CommentWrapper,
    Content, ContentWords,
    Describe, EditTextArea,
    Header,
    MessageWrapper,
    TextArea
} from "./style";
import * as actionCreators from "./store/actionCreators";
import {useDispatch} from "react-redux";
import {FlexWrapper} from "../home/style";
import {useHistory,withRouter} from "react-router-dom"
import user from "../../statics/user.png";
import {NavItem} from "../../common/header/style";
import {message, Spin} from "antd";


function Article(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const username = localStorage.getItem("username");
    const userPic = localStorage.getItem("userPic");
    const userid = localStorage.getItem("userid");
    const [title,setTitle] = useState();
    const [content,setContent] = useState([]);
    const [pic,setPic] = useState();
    const [author,setAuthor] = useState();
    const [time,setTime] = useState();
    const [thumb,setThumb] = useState(0);
    const [id,setID] = useState();
    const [alreadyThumb,setAlreadyThumb] = useState(false);
    const [messageInput,setMessage] = useState();
    const [comment,setComment] = useState([]);
    const [loading,setLoading] = useState(false);
    const idStr = props.location.search.replace(/[^0-9]/ig,"")
    useEffect(()=>{
        new Promise((resolve) => {
            setLoading(true);
            dispatch(actionCreators.getArticle(username,idStr,setTitle,setPic,setContent,setAuthor,setTime,setThumb,setID,setAlreadyThumb,setComment));
            resolve();
        }).then(()=>{
            setLoading(false);
        })    },[])
    useEffect(()=>{
        if (messageInput){
            if (messageInput.length > 50){
                setMessage(messageInput.slice(0,50))
            }}
    },[messageInput])
    return(
        <Fragment>
        {loading?<Spin />:
        <Fragment>
            <ArticleWrapper>
                <Header>{title}</Header>
                <Describe>作者 : {author}</Describe>
                <Describe>發佈時間 : {time}</Describe>
                <Content>
                    <img src={`data:image/jpeg;base64,${pic}`} />
                    {content.map((item,index)=>{
                        return (
                            <p>{item}</p>
                        )
                    })}
                </Content>
                {username?
                <div style={{marginTop:60}}>
                    {alreadyThumb?
                        <span className={"iconfontThumb"} style={{color:"blue"}} onClick={()=>{
                        dispatch(actionCreators.ThumbArticle(username,id,setThumb,setAlreadyThumb,false));
                    }}>&#xe71f;</span>:
                        <span className={"iconfontThumb"} onClick={()=>{
                        dispatch(actionCreators.ThumbArticle(username,id,setThumb,setAlreadyThumb,true));
                    }}>&#xe71f;</span>
                    }

                    <span style={{marginLeft:22,color:"grey"}}> 目前共有<span style={{color:"blue"}}>{thumb}</span>個人說這篇貼文讚</span>
                </div>:
                    <div>
                        <span className={"iconfontThumb"} onClick={()=>{
                            history.push("/login");
                        }}>&#xe71f;</span> <span style={{marginLeft:22,color:"grey"}}>目前共有<span style={{color:"blue"}}>{thumb}</span>個人說這篇貼文讚</span>
                    </div>
                }
                {username?
                    <Fragment>
                    <MessageWrapper>
                        <img src={userPic ? `data:image/jpeg;base64,${userPic}` : user} style={{
                            display:"inline-block",
                            height: 45,
                            width: 45,
                            borderRadius: "100%",
                            marginRight:24
                        }}/>
                        <TextArea value={messageInput} onChange={(e)=>{
                            setMessage(e.target.value);

                        }}/>
                    </MessageWrapper>
                        <Button className={"publish"} onClick={()=>{
                            if(messageInput){
                                dispatch(actionCreators.addComment(userid,messageInput,idStr,comment,setComment));
                                setMessage("");
                            }
                            else{
                                message.error("請發表評論");
                            }
                        }}>發佈</Button>
                        <Button className={"cancel"} onClick={()=>{
                            setMessage("");
                        }}>取消</Button>
                    </Fragment>
                    :
                    <Fragment />
                }
                <CommentWrapper>
                    <CommentTitle>全部評論 {comment.length}</CommentTitle>
                    {comment?comment.map((item)=>{
                        return(<ContentItem key={item.commentid} username={item.username} time={item.time} content={item.content} userPic={item.userPic} userid={item.userid} currentUser = {userid} history={history} comment={comment} setComment={setComment} commentid={item.commentid}></ContentItem>)
                    }):<Fragment />}
                </CommentWrapper>
            </ArticleWrapper>
        </Fragment>}
        </Fragment>
    )
}

function ContentItem(props){
    const dispatch = useDispatch();
    const [show,setShow] = useState(false);
    const [edit,setEdit] = useState(false);
    const [editComment,setEditComment] = useState(props.content);
    const [content,setContent] = useState(props.content);
    const [time,setTime] = useState(props.time);
    useEffect(()=>{
        window.addEventListener("click",()=>{
            setShow(false);
        })
        return ()=>{
            window.removeEventListener("click",()=>{
            setShow(false);
        })
        }
    },[])
    useEffect(()=>{
        if(editComment.length > 50){
            setEditComment(editComment.slice(0,50))
        }
    },[editComment])
    return(
    <Fragment>
        <CommentList>
            <img src={props.userPic?`data:image/jpeg;base64,${props.userPic}`:user} style={{
                display:"inline-block",
                height: 45,
                width: 45,
                borderRadius: "100%",
                marginRight:12,
                cursor:"pointer"
            }} onClick={()=>{
                props.history.push("/user?id=" + props.userid);
            }}/>
            <div style={{borderBottom: '1px solid #eee',paddingBottom:16,width:"100%"}}>
                <ContentWords className={"username"} >{props.username}</ContentWords>
                <ContentWords className={"time"}>{time}</ContentWords>
                <ContentWords className={"content"}>{edit?<Fragment><EditTextArea value={editComment} onChange={(e)=>{
                        setEditComment(e.target.value);
                    }}/>

                <Button className={"publish"} onClick={()=>{
                    if(editComment){
                        dispatch(actionCreators.editcomment(editComment,props.commentid,setContent,setTime,props.currentUser));
                        setEdit(false);
                    }
                }}>發佈</Button>
                <Button className={"cancel"} onClick={()=>{
                            setEdit(false);
                        }}>取消</Button>
                </Fragment>
                :content}</ContentWords>
            </div>
            {String(props.currentUser) === String(props.userid)?
                <div style={{marginLeft:"auto"}}>
                    <span className={"iconfontComment"} onClick={(e)=>{
                        e.stopPropagation();
                        setShow(!show);
                    }}>&#xe66f;</span>
                    <ActionWrapper show={show} onClick={(e)=>{
                        e.stopPropagation();
                    }}>
                        <ActionWords className={"top"} onClick={()=>{
                            setEdit(true);
                            setShow(false);
                        }}>編輯評論</ActionWords>
                        <ActionWords onClick={()=>{
                            dispatch(actionCreators.deleteComment(props.commentid,props.comment,props.setComment,props.currentUser));
                        }}>刪除評論</ActionWords>
                    </ActionWrapper>
                </div>
                :<Fragment />}
        </CommentList>
    </Fragment>
    )
}


export default withRouter(Article)