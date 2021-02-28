import styled from "styled-components";

export const UserInfoWrapper = styled.div`
    float:left;
    margin-left:12%;
    width:50%;
    height:500px;
    margin-right:5%;
    padding:26px 10px;
`

export const UserInfoHead = styled.div`
    width:100%;
    height:auto;
    display:flex;
`

export const DeleteButton = styled.div`
    border-radius:20%;
    text-align:center;
    float:right;
    margin-left:10px;
    cursor:pointer;
`

export const UserPicture = styled.img`
    width:80px;
    height:80px;
    border-radius:100%;
`


export const FlexWrapper = styled.div`
    margin-top:10px;
    display:flex;
`

export const UserName = styled.div`
    display:flex;
    align-items:center;
    font-size:32px;
    color:#333;
    font-weight: 700;
`

export const Info = styled.div`
    color:#969696;
    font-size:14px;
`

export const NumberInfo = styled.div`
    height:18px;
`

export const GridWrapper = styled.div`
    padding:10px;
    &.left{
        padding-left:0px;
    }
`

export const Line = styled.div`
    border-right: 1px solid #b5b5b5;
    position:relative;
    top:4px;
    height:40px;
`

export const SelectWrapper = styled.div`
    display:flex;
    margin-top:28px;
    padding-bottom:8px;
    border-bottom:1px solid #f0f0f0;
`

export const SelectItem = styled.div`
    color: #646464;
    font-weight:700;
    font-size:22px;
    margin-right:26px;
    cursor:pointer;
    padding:15px;
    &.active{
    border-bottom:2px solid #646464;
    }
`

export const Attention = styled.span`
    position:relative;
    margin-left:14px;
    color: #42c02e;
    font-size:15px;
    cursor:pointer;
    &.minus{
        color:#FA94AD;
    }
`