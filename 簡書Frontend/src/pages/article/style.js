import styled from "styled-components";

export const ArticleWrapper = styled.div`
    overflow:hidden;
    width:620px;
    margin: 0 auto;
    padding-bottom: 100px;
`
export const Header = styled.div`
    margin: 50px 0 20px 0;
    line-height: 44px;
    font-size: 34px;
    color: #333;
    font-weight: bold;
`

export const Content = styled.div`
    color:#2f2f2f;
    img{
        width:100%;
    }
    p {
        margin:25px 0;
        font-size:16px;
        line-height:30px;
    }
`

export const Describe = styled.div`
    font-size: 14px;
    margin: 12px 0px;
    color: #828C93;
`
export const MessageWrapper = styled.div`
    margin-top:48px;
    display:flex;
`

export const TextArea = styled.textarea.attrs({
    placeholder:'寫下你的評論...'
})`
    height:100px;
    background-color: #fafafa;
    border-radius: 4px;
    padding:8px 6px;
    border: 1px solid #eee;
    flex:1 0 0;
    font-size:18px;
`

export const Button = styled.div`
    margin-left:20px;
    cursor:pointer;
    margin-top:16px;
    float:right;
    width:60px;
    height:38px;
    line-height:38px;
    text-align:center;
    border-radius: 19px;
    &.publish{
        color:#fff;
        background:#ec6149;  
        border: 1px solid #ec6149;   
    }
    &.cancel{
        color: #999;
        background-color: #fff;
        border: 1px solid #999;;
    }
`

export const CommentWrapper = styled.div`
    clear:both;
    margin-top:24px;
`

export const CommentTitle = styled.div`
    margin-top:72px;
    margin-bottom:48px;
    padding-left: 12px;
    border-left: 4px solid #ec7259;
    font-size: 22px;
    font-weight: 700;
    height: 24px;
    line-height: 24px;
`

export const CommentList = styled.div`
    margin-top:18px;
    display:flex;
    width:90%;
`

export const ContentWords = styled.div`
    &.username{
        font-size:22px;
        font-weight:700;
    }
    &.time{
        margin-top:8px;
        font-size: 15px;
        color: #969696;
    }
    &.content{
        margin: 16px 0px;
        font-size: 18px;
        line-height: 1.5;
        width:93%;
    }
`

export const ActionWrapper = styled.div`
    width:100px;
    height:100px;
    float:left;
    margin-top:6px;
    position:absolute;
    display:${props => props.show?"flex":"none"};
    flex-direction:column;
    justify-content:center;
    align-items : center;
    border: 1px solid rgba(0,0,0,.15);
    font-size:18px;
`

export const ActionWords = styled.div`
    cursor:pointer;
    &.top{
        margin-bottom:26px;
    }
`

export const EditTextArea = styled.textarea`
    width:100%;
`