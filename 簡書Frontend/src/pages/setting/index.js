import React,{Fragment,useState,useEffect} from "react";
import {FirstUserSetting, SecondUserSetting, SettingWrapper, Submit, UserSettingButton, UserSettingDiv} from "./style";
import {UserPicture} from "../userPage/style";
import user from "../../statics/user.png";
import {useDispatch, useSelector} from "react-redux";
import * as actionCreators from "./store/actionCreators";
import {message} from "antd";
import {RecommendItem, RecommendWrapper, WriterTitle, WriterWrapper} from "../home/style";
import pic1 from "../../statics/daily.png";
import pic2 from "../../statics/123.png";
import pic3 from "../../statics/member.png";
import pic4 from "../../statics/opt.png";
import {RecommendWriter} from "../home/components/Writer";
import {getWriter} from "../home/store/actionCreator";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom'

function Setting(){
    const username = localStorage.getItem("username");
    const userPic = localStorage.getItem("userPic");
    const email = localStorage.getItem("userEmail");
    const recommendWriter = useSelector(state => state.get("home").recommendWriter);
    const [usernameInput,setUsernameInput] = useState(username);
    const [emailInput,setEmailInput] = useState(email);
    const [passwordInput,setPasswordInput] = useState();
    const [pic,setPic] = useState();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getWriter());
    },[])
    return(
        <Fragment>
            <SettingWrapper>
                <UserSettingDiv>
                    {pic? <UserPicture src={URL.createObjectURL(pic)} />:<UserPicture src={userPic?`data:image/jpeg;base64,${userPic}`:user} />}
                    <SecondUserSetting>
                        <label htmlFor={"filePicker"}><UserSettingButton>更改頭像</UserSettingButton></label>
                        <input type={'file'}
                               accept={".jpg,.png,.jfif"}
                               id={"filePicker"}
                               style={{visibility:"hidden"}}
                               onChange={(e)=>{setPic(e.target.files[0])}} />
                    </SecondUserSetting>
                </UserSettingDiv>
                <UserSettingDiv>
                    <FirstUserSetting>暱稱</FirstUserSetting>
                    <SecondUserSetting>
                        <input type={'text'} style={{width:250,height:40,fontSize:20}} value={usernameInput} onChange={(e)=>{
                            setUsernameInput(e.target.value);
                        }}/>
                    </SecondUserSetting>
                </UserSettingDiv>
                <UserSettingDiv>
                    <FirstUserSetting>電子郵件</FirstUserSetting>
                    <SecondUserSetting>
                        <input type={'text'} style={{width:250,height:40,fontSize:20}} value={emailInput} onChange={(e)=>{
                            setEmailInput(e.target.value);
                        }}/>
                    </SecondUserSetting>
                </UserSettingDiv>
                <UserSettingDiv>
                    <FirstUserSetting>修改密碼</FirstUserSetting>
                    <SecondUserSetting>
                        <input type={'text'} style={{width:250,height:40,fontSize:20}} value={passwordInput} onChange={(e)=>{
                            setPasswordInput(e.target.value);
                        }}/>
                    </SecondUserSetting>
                </UserSettingDiv>
                <UserSettingDiv>
                    <FirstUserSetting>語言設置</FirstUserSetting>
                    <SecondUserSetting>
                        <div style={{marginRight:28}}>
                            <input type={"radio"} value={"簡體"} name={"lan"}/><label> 簡體中文</label>
                        </div>
                        <div>
                            <input type={"radio"} value={"繁體"} name={"lan"}/><label> 繁體中文</label>
                        </div>
                    </SecondUserSetting>
                </UserSettingDiv>
                <Submit onClick={()=>{
                    if (emailInput){
                        if(emailInput.includes("@") && emailInput.includes(".com")){
                            dispatch(actionCreators.changeSetting(username,pic,emailInput,usernameInput));
                        }
                        else{
                            message.error("信箱格式不正確");
                        }
                    }
                    else{
                        dispatch(actionCreators.changeSetting(username,pic,emailInput,usernameInput));
                    }
                }}>保存</Submit>
            </SettingWrapper>
            <div style={{float:"left"}}>
                <RecommendUser />
                <WriterWrapper>
                    <WriterTitle>推薦作者</WriterTitle>
                    {recommendWriter.map((item)=>{
                        return (
                            <Link to={"/user?id=" + item.userid}>
                                <RecommendWriter name={item.username} info={item.info} userPic={item.userPic} key={item.userid} thumb={item.userThumb}/>
                            </Link>
                            )
                    })}
                </WriterWrapper>
            </div>
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
export default withRouter(Setting)
