import React, {Fragment,useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    UserInfoHead,
    UserInfoWrapper,
    UserName,
    UserPicture,
    FlexWrapper,
    Info,
    NumberInfo,
    GridWrapper, Line, SelectWrapper, SelectItem, DeleteButton, Attention
} from "./style";
import user from "../../statics/user.png";
import pic1 from "../../statics/daily.png";
import pic2 from "../../statics/123.png";
import pic3 from "../../statics/member.png";
import pic4 from "../../statics/opt.png";
import {ListInfo, ListItem, RecommendItem, RecommendWrapper, WriterTitle, WriterWrapper} from "../home/style";
import {getWriter} from "../home/store/actionCreator";
import * as actionCreators from "./store/actionCreators";
import {Link, useHistory, withRouter} from "react-router-dom";
import {Tooltip} from "antd";

function UserPage(props){
    const currentUserid = useSelector(state => state.get("login").userid);
    const articleList = useSelector(state => state.get("userpage").articleList);
    const eventList = useSelector(state => state.get("userpage").eventList);
    const [article,setArticle] = useState(true);
    const [news,setNews] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const [username,setUsername] = useState();
    const [userPic,setUserPic] = useState();
    const [userPostNum,setUserPostNum] = useState(0);
    const [thumb,setThumb] = useState(0);
    const [followed,setFollowed] = useState(false);
    const [userFans,setUserFans] = useState(0);
    const [userFollow,setUserFollow] = useState(0);
    const idStr = props.location.search.replace(/[^0-9]/ig,"");
    const currentUsername = localStorage.getItem("username")

    useEffect(()=>{
        dispatch(getWriter());
        dispatch(actionCreators.getUserPage(currentUsername,idStr,setUsername,setUserPic,setUserPostNum,setThumb,setUserFans,setFollowed,setUserFollow));
    },[])
    return(
        <Fragment>
            <UserInfoWrapper>
                <UserInfoHead>
                    <UserPicture src={userPic?`data:image/jpeg;base64,${userPic}`:user} />
                    <div style={{marginLeft:30}}>
                        <UserName>{username} {
                            currentUserid!=idStr?
                            <Fragment>
                            {followed?
                                    <Attention className={"minus"} onClick={()=>{
                                            dispatch(actionCreators.followUser(currentUsername, idStr, false, setFollowed, setUserFans));
                                        }}>-取消關注</Attention>:
                                    <Attention
                                        onClick={()=>{
                                            if(currentUsername){
                                                dispatch(actionCreators.followUser(currentUsername,idStr,true,setFollowed,setUserFans));
                                            }
                                            else{
                                                history.push("/login");
                                            }
                                        }}>+關注</Attention>
                            }</Fragment>:
                                <Fragment />
                        }
                        </UserName>
                        <FlexWrapper>
                            <InfoFun info={"關注"} class={"left"} number={userFollow} />
                            <InfoFun info={"粉絲"} number={userFans}/>
                            <InfoFun info={"文章"} number={userPostNum}/>
                            <InfoFun info={"收穫喜歡"} number={thumb} noLine={true}/>
                        </FlexWrapper>
                    </div>
                </UserInfoHead>
                <SelectWrapper>
                    <SelectItem className={article?"active":""} onClick={()=>{
                        setArticle(true);
                        setNews(false);
                    }}><span className={"iconfontUserPage"}>&#xe879;</span>文章</SelectItem>
                    <SelectItem className={news?"active":""} onClick={()=>{
                        setArticle(false);
                        setNews(true);
                    }}><span className={"iconfontUserPage"}>&#xe63b;</span>動態</SelectItem>
                </SelectWrapper>
                {article?
                    <Fragment>{articleList.map((item)=>{
                return(
                        <ListItem>
                            {currentUserid==idStr?<Tooltip style={{width:0}} title={"點選以刪除貼文"}><DeleteButton onClick={()=>{
                                dispatch(actionCreators.deleteArticle(item.id));
                                window.location.href = "/user?id="+idStr;
                            }}><span className={"iconfontDelete"}>&#xe613;</span></DeleteButton></Tooltip>:<Fragment />}
                            <img src = {`data:image/jpeg;base64,${item.image}`} className='pic' />
                            <Link key = {item.id} to={'/article?id=' + item.id} >
                                <ListInfo>
                                    <h3>{item.title.length < 25? item.title:item.title.slice(0,25)}</h3>
                                    <p>{item.content[0] + "..."}</p>
                                </ListInfo>
                            </Link>
                            <div style={{clear:"both"}}></div>
                            <div style={{color:"black",marginTop:6}}><span className={"iconfont"}>&#xe71f;</span> {item.thumb} <span className={"iconfont"} style={{marginLeft:16}}>&#xe6e9;</span> {item.comment}</div>
                        </ListItem>
                )
                    })}</Fragment>
                    :<Fragment></Fragment>
                }
                {
                    news?
                        <Fragment>
                            {eventList.map((item)=>{
                                return(
                                    <ListItem>
                                        <ListInfo className={"userPage"}>
                                            <h5>{item.content}</h5>
                                            <p>{item.time}</p>
                                        </ListInfo>
                                    </ListItem>
                                        )
                            })}
                        </Fragment>:
                        <Fragment />
                }

            </UserInfoWrapper>
            <div style={{float:"left"}}>
                <RecommendUser />

            </div>
        </Fragment>


    )
}

function InfoFun(props){
    const leftClass = props.class;
    return(
        <Fragment>
            <GridWrapper className={leftClass}>
                <NumberInfo>{props.number?props.number:0}</NumberInfo>
                <Info>{props.info}</Info>
            </GridWrapper>
            {props.noLine?<Fragment></Fragment>:<Line />}
        </Fragment>

    )
}

function RecommendUser(){
    const List_js = [pic1,pic2,pic3,pic4]

    return(
        <RecommendWrapper>
            {List_js.map((item,index)=>{
                return(
                    <RecommendItem  key = {index} imgUrl = {item} />
                )
            })}
        </RecommendWrapper>
    )
}

export default withRouter(UserPage);