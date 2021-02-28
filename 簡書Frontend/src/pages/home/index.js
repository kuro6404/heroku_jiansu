import React,{useEffect} from 'react'
import {HomeWrapper,HomeLeft,HomeRight,BackTop} from "./style";
import {InitialHomePage} from "./store/actionCreator";
import picture from '../../statics/images.jfif'
import Topic from './components/Topic'
import Recommend from "./components/Recommend";
import List from "./components/List";
import Writer from "./components/Writer";
import {useDispatch,useSelector} from "react-redux";
import {actionCreators} from "../../common/header/store";
import {withRouter} from 'react-router-dom'


function Home(){
    const dispatch = useDispatch();
    const showScroll = useSelector(state => state.get('home').showScroll);
    useEffect(()=>{
        dispatch(InitialHomePage());
        window.addEventListener('scroll',()=>{
            if(document.documentElement.scrollTop > 650){
                dispatch(actionCreators.changeScroll(true));
            }
            else{
                dispatch(actionCreators.changeScroll(false));
            }
        })

        return ()=>{
            window.removeEventListener('scroll',()=>{
            if(document.documentElement.scrollTop > 650){
                dispatch(actionCreators.changeScroll(true));
            }
            else{
                dispatch(actionCreators.changeScroll(false));
            }
        });
        }
    },[])
    return(
            <HomeWrapper>
                <HomeLeft>
                    <div>
                        <img src= {picture} className = 'banner-img' />
                    </div>
                    <Topic />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <Writer />
                </HomeRight>
                <BackTop onClick={()=>{
                    window.scrollTo(0,0);
                }}
                className = {showScroll?"":'hide'}
                >回到頂部</BackTop>
            </HomeWrapper>
    )
}

export default withRouter(Home);