import React from 'react'
import {RecommendItem, RecommendWrapper} from "../style";
import {useSelector} from "react-redux";
import pic1 from "../../../statics/daily.png"
import pic2 from "../../../statics/123.png"
import pic3 from "../../../statics/member.png"
import pic4 from "../../../statics/opt.png"

export default function Recommend(){
    //const List_js = List.toJS();
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