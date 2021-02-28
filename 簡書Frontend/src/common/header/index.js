import React, {useState, useEffect, Fragment} from 'react'
import {message} from "antd";
import {CSSTransition} from 'react-transition-group'
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSearch,
    Button,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList,
    UserInfo, UserSelection
} from "./style";
import {useSelector,useDispatch} from "react-redux";
import {actionCreators} from './store'
import {getList} from "./store/actionCreator";
import {Link,useHistory} from "react-router-dom";
import user from "../../statics/user.png";
import * as loginActionCreators from "../../pages/login/store/actionCreators";


export function Header(){
    const limit = 5;
    const history = useHistory();
    const [spinIcon,setSpinIcon] = useState();
    const [userInfo,setUserInfo] = useState(false);
    const login = useSelector(state => state.get('login').login);
    const userPic = localStorage.getItem('userPic');
    const userid = useSelector(state => state.get("login").userid);
    const focus = useSelector(state => state.get('header').focus);
    const list = useSelector(state => state.get('header').list);
    const page = useSelector(state => state.get('header').page);
    const TotalPage = useSelector(state => state.get('header').totalPage);
    const PageList = [];
    const mouse = useSelector(state => state.get('header').mouse);
    const dispatch = useDispatch();
    for(let i = page*limit ; i < (page+1)*limit ; i++){
        if(list[i] != null){
            PageList.push(<SearchInfoItem>{list[i]}</SearchInfoItem>);
        }
    }
    useEffect(()=>{
        dispatch(getList(limit));
        document.addEventListener('click',()=>{HandleClick()});
        return ()=>{
            document.removeEventListener('click',()=>{HandleClick()});
        }
    },[])
    function HandleClick(){
        setUserInfo(false);
    }
    return(
        <HeaderWrapper>
                <Logo onClick={()=>{
                    window.location.href = "/";
                }}/>
            <Nav>
                <Link to='/write'>
                    <NavItem><Button className= 'writing'><span className="iconfont" style={{marginRight:8}}>&#xe655;</span>寫文章</Button></NavItem>
                </Link>
                {login ? <Fragment></Fragment>:<NavItem><Link to={"/register"}><Button className= 'reg' >註冊</Button></Link></NavItem>}
                <Link to={"/"}><NavItem className = 'left active'>首頁</NavItem></Link>
                <NavItem className = 'left'>下載App</NavItem>
                {login?
                    <NavItem className = 'right' onClick={(e)=>{
                        e.stopPropagation();
                    }}>
                        <img src={userPic ?`data:image/jpeg;base64,${userPic}`:user} style={{cursor:"pointer",height:35,width:35,position:'relative',top:12,borderRadius:"100%"}} onClick={(e)=>{
                            setUserInfo(!userInfo);
                        }}/>
                        <UserInfo style={{display:userInfo?"":"none"}}>
                            <div style={{width:140}}><UserSelection
                                onClick={()=>{
                                    window.location.href = "/user?id="+userid;
                                }}
                            ><span className={"iconfontUser"}>&#xe67f;</span>我的主頁</UserSelection></div>
                            <div style={{width:140}}><UserSelection onClick={()=>{
                                window.location.href = "/setting";
                            }}><span className={"iconfontUser"}>&#xe662;</span>設定</UserSelection></div>
                            <div style={{width:140}}><UserSelection onClick={()=>{
                                dispatch(loginActionCreators.Logout(false));
                                localStorage.removeItem("username");
                                localStorage.removeItem("userPic");
                                localStorage.removeItem("userEmail");
                                localStorage.removeItem("userid");
                                localStorage.removeItem("userPostNum");
                                history.push("/");
                                message.success("登出成功");
                            }}><span className={"iconfontUser"}>&#xe7cd;</span>退出</UserSelection></div>
                        </UserInfo>
                    </NavItem> :
                    <Link to='/login'><NavItem className = 'right'>登錄</NavItem></Link>}
                <NavItem className = 'right'><span className="iconfont">&#xe636;</span></NavItem>
                <SearchWrapper>
                    <CSSTransition
                        in={focus}
                        timeout={200}
                        classNames='slide'
                    >
                        <NavSearch className = {focus | mouse? "focus" : ''}
                        onFocus = {()=>{dispatch(actionCreators.changeFocus(true))}}
                        onBlur = {()=>{dispatch(actionCreators.changeFocus(false))}}
                        />
                    </CSSTransition>
                    <span className={focus ?"iconfont focus zoom":'iconfont zoom'}>&#xe854;</span>
                    <SearchInfo
                        onMouseEnter = {()=>{dispatch(actionCreators.changeMouse(true))}}
                        onMouseLeave = {()=>{dispatch(actionCreators.changeMouse(false))}}
                        style = {{display:mouse|focus?'block':'none'}}>
                        <SearchInfoTitle>
                            熱門搜尋
                            <SearchInfoSwitch onClick = {()=>{dispatch(actionCreators.changePage(page,TotalPage,spinIcon))}}>
                                <span ref={(icon)=>{setSpinIcon(icon)}} className="iconfont spin">&#xe851;</span>
                                換一換
                            </SearchInfoSwitch>
                        </SearchInfoTitle>
                        <SearchInfoList>
                            {PageList}
                        </SearchInfoList>
                    </SearchInfo>
                </SearchWrapper>

            </Nav>
        </HeaderWrapper>
    )
}