import React,{useEffect,useRef,useState} from 'react'
import {Redirect} from 'react-router-dom'
import {Link,useLocation,useHistory} from "react-router-dom";
import {withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import QQ from "../../statics/qq.jfif"
import wechat from "../../statics/wechat.png"
import weibo from "../../statics/weibo.png"
import {
    LoginWrapper,
    LoginBox,
    LoginInput,
    LoginButton,
    LoginHeadWrapper,
    LoginHeadTitle,
    OtherLogin,
    Border, LogoImg
} from "./style";
import {LoginAction} from "./store/actionCreators";

function Login(props){
    const inputAccount = useRef(null);
    const inputPassword = useRef(null);
    const login = useSelector(state => state.get('login').login);
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [headTitleHover1,setHeadTitleHover1] = useState(false);
    const [headTitleHover2,setHeadTitleHover2] = useState(false);
    if(!login){
        return(
            <LoginWrapper>
                <LoginBox>
                    <LoginHeadWrapper>
                            <LoginHeadTitle
                                bottom={headTitleHover1}
                                onMouseOver={()=>{
                                    setHeadTitleHover1(true);
                                    }
                                }
                                onMouseLeave={()=>{
                                    setHeadTitleHover1(false);
                                }}
                                className={location.pathname == "/login" ? "active" : ""}
                                onClick={()=>{
                                    history.push("/login");
                                }}
                            >登入</LoginHeadTitle>
                            <LoginHeadTitle
                                bottom={headTitleHover2}
                                onMouseOver={()=>{
                                    setHeadTitleHover2(true);
                                    }
                                }
                                onMouseLeave={()=>{
                                    setHeadTitleHover2(false);
                                }}
                                onClick={()=>{
                                    history.push("/register");
                                }}
                                className={location.pathname == "/register" ? "active" : ""}
                            >註冊</LoginHeadTitle>
                    </LoginHeadWrapper>
                    <span className="iconfontFirst">&#xe67f;</span>
                    <span className="iconfontSecond">&#xe608;</span>
                    <LoginInput placeholder='手機號或郵箱' ref={inputAccount}></LoginInput>
                    <LoginInput placeholder='密碼' type='password' ref={inputPassword}></LoginInput>
                    <LoginButton onClick={()=>{dispatch(LoginAction(inputAccount.current.value,inputPassword.current.value))}}> 登錄</LoginButton>
                    <LoginHeadWrapper>
                        <Border /><OtherLogin>社交帳號登入</OtherLogin><Border />
                    </LoginHeadWrapper>
                    <div style={{textAlign:"center"}}>
                        <LogoImg src={QQ} />
                        <LogoImg src={wechat} />
                        <LogoImg src={weibo} />
                    </div>
                </LoginBox>
            </LoginWrapper>
        )
    }
    else{
        return <Redirect to='/' />
    }

}

export default withRouter(Login)
