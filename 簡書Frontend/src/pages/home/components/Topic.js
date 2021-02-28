import React from 'react'
import {TopicWrapper,TopicItem} from "../style";
import cuteIcon from '../../../statics/cuteIcon.jfif'
import {useSelector,useDispatch} from "react-redux";

export default function Topic(){
    const list = useSelector(state => state.get('home').topicList);

    return(
        <TopicWrapper>
            {list.map((item)=>{
                return(
                    <TopicItem key = {item.id}>
                        <img src={cuteIcon} className='icon'/>
                        {item.title}
                    </TopicItem>
                )
            })}
        </TopicWrapper>
    )
}