import React,{useEffect} from 'react'
import {DetailWrapper,Header,Content} from "./style";
import {withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import * as actionCreators from "./store/actionCreators";

function Detail(props){
    const title = useSelector(state => state.get('detail').title);
    const content = useSelector(state => state.get('detail').content);
    const dispatch = useDispatch();
    useEffect(()=>{
        const idStr = props.location.search.replace(/[^0-9]/ig,"")
        dispatch(actionCreators.getDetail(idStr));
    },[])
    return(
        <DetailWrapper>
            <Header>{title}</Header>
            <Content dangerouslySetInnerHTML={{__html: content}} />
        </DetailWrapper>
    )
}

export default withRouter(Detail);