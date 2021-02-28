import React, {Fragment, useEffect, useRef, useState} from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {Submit, WritingItemWrapper, WritingTitle, WritingWrapper} from "./style";
import {SecondUserSetting, UserSettingButton} from "../setting/style";
import * as actionCreators from "./store/actionCreators";
import {Input,message} from "antd";


function Write(props){
    const login = useSelector(state => state.get('login').login);
    const username = useSelector(state => state.get('login').username)
    const [pic,setPic] = useState();
    const [title,setTitle] = useState();
    const [content,setContent] = useState();
    const dispatch = useDispatch();
    const {TextArea} = Input;
    if(login){
        return(
            <Fragment>
                <WritingWrapper>
                    <WritingItemWrapper>
                        <WritingTitle>文章標題</WritingTitle>
                        <input type={"text"} style={{width:350,height:40,marginLeft:30}} value={title} onChange={(e)=>{
                            setTitle(e.target.value);
                        }}/>
                    </WritingItemWrapper>
                    <WritingItemWrapper>
                        <WritingTitle>封面圖片</WritingTitle>
                        <label htmlFor={"filePicker"} style={{marginLeft:30}}><UserSettingButton>上傳封面</UserSettingButton></label>
                        <input type={'file'}
                               id={"filePicker"}
                               accept={".jpg,.png,.jfif"}
                               style={{display:"none"}}
                               onChange={(e)=>{setPic(e.target.files[0])}} />
                        <img src={pic?URL.createObjectURL(pic):""} style={{width:150,height:100,marginLeft:50,display:pic?"":"none"}} />
                    </WritingItemWrapper>
                    <WritingItemWrapper>
                        <WritingTitle>文章內容</WritingTitle>
                        <TextArea style={{width:500,height:100,marginLeft:30}} value={content} onChange={(e)=>{
                            setContent(e.target.value);
                        }}/>
                    </WritingItemWrapper>
                    <Submit onClick={()=>{
                        if(title && pic && content) {
                            dispatch(actionCreators.postArticle(username,title,pic,content,setTitle,setPic,setContent));
                        }
                        else{
                            message.error("資訊不完整");
                        }
                    }}>發佈</Submit>
                </WritingWrapper>
            </Fragment>
        )
    }
    else{
        return <Redirect to='/login' />
    }

}
export default withRouter(Write);

