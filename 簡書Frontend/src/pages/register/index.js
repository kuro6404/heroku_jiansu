import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory, useLocation} from "react-router-dom";
import {
    Border,
    LoginBox,
    LoginButton,
    LoginHeadTitle,
    LoginHeadWrapper,
    LoginInput,
    LoginWrapper, LogoImg, OtherLogin
} from "../login/style";
import {RegisterAction} from "./store/actionCreators";
import QQ from "../../statics/qq.jfif";
import wechat from "../../statics/wechat.png";
import {message} from "antd"
import {withRouter} from 'react-router-dom'

function Register(){

    const inputAccount = useRef(null);
    const inputPassword = useRef(null);
    const inputUsername = useRef(null);
    const login = useSelector(state => state.get('login').login);
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [headTitleHover1,setHeadTitleHover1] = useState(false);
    const [headTitleHover2,setHeadTitleHover2] = useState(false);
    if(!login){
        return(
            <LoginWrapper>
                <LoginBox style={{height:525}}>
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
                    <span className="iconfontSecond">&#xe692;</span>
                    <span className="iconfontThird">&#xe608;</span>
                    <LoginInput placeholder='你的暱稱' ref={inputUsername}></LoginInput>
                    <LoginInput placeholder='手機號' ref={inputAccount}></LoginInput>
                    <LoginInput placeholder='密碼' type='password' ref={inputPassword}></LoginInput>
                    <LoginButton className={"register"}
                        onClick={()=>{
                            if(inputUsername.current.value && inputAccount.current.value && inputPassword.current.value) {
                                dispatch(RegisterAction(inputUsername.current.value, inputAccount.current.value, inputPassword.current.value, history));
                            }
                            else{
                                message.error("未填寫所有欄位");
                            }
                        }}
                    >註冊</LoginButton>
                    <LoginHeadWrapper>
                        <Border /><OtherLogin>社交帳號直接註冊</OtherLogin><Border />
                    </LoginHeadWrapper>
                    <div style={{textAlign:"center"}}>
                        <LogoImg src={QQ} />
                        <LogoImg src={wechat} />
                    </div>
                </LoginBox>
            </LoginWrapper>
        )
    }
    else{
        return <Redirect to='/' />
    }

}
export default withRouter(Register)