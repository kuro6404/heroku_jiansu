import React,{useEffect} from 'react'
import {ListInfo, ListItem,LoadMore} from "../style";
import {useSelector,useDispatch} from "react-redux";
import * as actionCreators from "../store/actionCreator";
import {Link} from "react-router-dom";
import * as actionTypes from "../store/actionTypes";

export default function List(){
    const List = useSelector(state => state.get('home').articleList);
    const articlePage = useSelector(state => state.get('home').articlePage);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({type:actionTypes.INIT_PAGE,value:0})
    },[])
    return(
        <div>
            {List.map((item)=>{
                return(
                    <Link key = {item.id} to={'/article?id=' + item.id} >
                        <ListItem>
                            <img src = {`data:image/jpeg;base64,${item.image}`} className='pic' />
                            <ListInfo>
                                <h3>{item.title.length < 25? item.title : item.title.slice(0,25) + "..."}</h3>
                                <p>{item.content[0] + "..."}</p>
                            </ListInfo>
                            <div style={{clear:"both"}}></div>
                            <div style={{color:"black",marginTop:6}}><span className={"iconfont"}>&#xe71f;</span> {item.thumb} <span className={"iconfont"} style={{marginLeft:16}}>&#xe6e9;</span> {item.comment}</div>
                        </ListItem>
                    </Link>
                )
            })}
            <LoadMore articlePage={articlePage} onClick = {()=>{
                dispatch(actionCreators.getMoreList());
            }}>更多資訊</LoadMore>
        </div>
    )
}