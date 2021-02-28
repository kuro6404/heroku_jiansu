import React,{useEffect,useState} from 'react'
import {
    FlexWrapper,
    RecommendItem,
    WriterInfo,
    WriterInfoWrapper,
    WriterName,
    WriterTitle,
    WriterWrapper
} from "../style";
import user from "../../../statics/user.png";
import {NavItem} from "../../../common/header/style";
import * as actionCreators from "../store/actionCreator";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

export default function Writer(){
    const dispatch = useDispatch();
    const recommendWriter = useSelector(state => state.get("home").recommendWriter);

    useEffect(()=>{
        dispatch(actionCreators.getWriter());
    },[])

    return(
        <WriterWrapper>
            <WriterTitle>推薦作者</WriterTitle>
            {recommendWriter.map((item,index)=>{
                return (
                    <Link to={"/user?id=" + item.userid}>
                        <RecommendWriter name={item.username} info={item.info} userPic={item.userPic} key={item.userid} thumb={item.userThumb} />
                    </Link>
                    )
            })}
        </WriterWrapper>
    )
}

export function RecommendWriter(props){
    return(
        <WriterInfoWrapper>
             <img src={props.userPic?`data:image/jpeg;base64,${props.userPic}`:user} style={{cursor:"pointer",height:35,width:35,borderRadius:"100%"}} />
            <FlexWrapper>
                <WriterName>{props.name}</WriterName>
                <WriterInfo>寫了<strong style={{fontWeight:500,color:"black"}}>{props.info}</strong>篇文章 <span style={{marginLeft:10}}>獲得了<strong style={{fontWeight:500,color:"black"}}>{props.thumb}</strong>個喜歡</span></WriterInfo>
            </FlexWrapper>
        </WriterInfoWrapper>
    )
}