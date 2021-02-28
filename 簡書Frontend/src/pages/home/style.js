import styled from "styled-components";

export const HomeWrapper = styled.div`
    width:960px;
    margin:0 auto; // 製中
    overflow:hidden;
`

export const HomeLeft = styled.div`
    width:625px;
    padding-top:30px;
    margin-left:15px;
    float:left;
    .banner-img{
        width:625px;
        height:270px;
    }
`

export const HomeRight = styled.div`
    width:280px;
    float:right;
`

export const TopicWrapper = styled.div`
    padding: 20px 0 10px 0;
    overflow:hidden;
    margin-left:-18px;
    border-bottom:1px solid #dcdcdc;
`

export const TopicItem = styled.div`
    float:left;
    height:32px;
    margin-left:18px;
    line-height:32px;
    padding-right:10px;
    background:#f7f7f7;
    font-size:14px;
    color:#000;
    border:1px solid #dcdcdc;
    border-radius:4px;
    margin-bottom:18px;
    .icon{
        display:block;
        float:left;
        width:32px;
        height:32px;
        margin-right:10px;
    }
`

export const ListItem = styled.div`
 padding:20px 0;
 border-bottom:1px solid #dcdcdc;
 overflow:hidden;
 .pic{
    display:block;
    width:23%;
    float:right;
    border-radius:10px;
 }
`

export const ListInfo = styled.div`
    width:70%;
    float:left;
    height:100px;
    overflow:hidden;
    h3{
        font-size:18px;
        line-height:27px;
        font-weight:bold;
        color:#333;
    }
     h5{
        font-size:16px;
        line-height:27px;
        font-weight:bold;
        color:#333;
    }
    p{
        line-height:24px;
        font-size:13px;
        color:#999;
    }
    &.userPage{
        height:auto;
    }
`
export const RecommendWrapper = styled.div`
    margin:30px 0;
    width:280px;
`

export const RecommendItem = styled.div`
    margin-bottom:10px;
    width:280px;
    height:50px;
    background:url(${(props)=>props.imgUrl});
    background-size:contain;
`

export const WriterWrapper = styled.div`
    padding:15px 10px;
    width:278px;
    border:1px solid #dcdcdc;
    border-radius:3px;
    height:300px;
`

export const WriterTitle = styled.div`
    font-size: 16px;
    color: #969696;
    text-align: left;
    margin-bottom:8px;
    padding-bottom:8px;
    border-bottom : 1px solid;
`

export const FlexWrapper = styled.div`
    display:flex;
    padding-top:4px;
    padding-left:8px;
    flex-direction:column;
`

export const WriterName = styled.div`
    margin-bottom:6px;
    color:black;
`

export const WriterInfo = styled.div`
    font-size: 12px;
    color: #969696;
`

export const WriterInfoWrapper = styled.div`
    padding:8px 10px;
    height:60px;
    display:flex;
`


export const LoadMore = styled.div`
    width:100%;
    height:40px;
    line-height:40px;
    margin:30px 0;
    background:#a5a5a5;
    text-align:center;
    border-radius:20px;
    cursor:pointer;
    display:${(props) => props.articlePage == 2 ?"none":""};
`

export const BackTop = styled.div`
    position:fixed;
    right:70px;
    bottom:70px;
    width:86px;
    height:60px;
    line-height:60px;
    background:#E3E2E2;
    cursor:pointer;
    border-radius:30%;
    text-align:center;
    border:1px solid #ccc;
    font-size:14px;
    &.hide{
        display:none;
    }
`