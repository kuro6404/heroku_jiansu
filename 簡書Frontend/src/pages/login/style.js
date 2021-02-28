import styled from "styled-components";

export const LoginWrapper = styled.div`
    height:calc(100vh - 59px);
    display:flex;
    justify-content:center;
    background:#eee;
`

export const LoginBox = styled.div`
    width:450px;
    height:450px;
    padding-top:20px;
    margin-top:30px;
    background:#fff;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
`

export const LoginInput = styled.input.attrs({

})`
   background:#B5B5B51A;
   border-radius: 4px 4px 0 0;
   border:1px solid #c8c8c8;
   display:block;
   font-size:15px;
   margin-bottom:0px;
   width:250px;
   height:50px;
   line-height:50px;
   padding: 0 50px;
   color:#777;
   margin:20px auto;
`

export const LoginButton = styled.div`
   width:350px;
   height:50px;
   line-height:50px;
   font-size:18px;
   color:#fff;
   background:#3194d0;
   border-radius:25px;
   margin:30px auto;
   margin-top:50px;
   text-align:center;
   cursor:pointer;
   &.register{
    background:#42C02E;
   }
`

export const LoginHeadWrapper = styled.div`
    margin:20px auto;
    height:0px;
    display:flex;
    justify-content:center;
    align-items:center;
    
`

export const LoginHeadTitle = styled.div`
    color:#969696;
    padding:10px;
    margin:14px;
    font-size:24px;
    cursor:pointer;
    border-bottom:${(props) => props.bottom?"3px solid #EA6F5A":""};
    &.active{
        color:#EA6F5A;
        font-weight:bold;
        
    }
`

export const OtherLogin = styled.div`
    padding-right:15px;
    padding-left:15px;
    padding-top:14px;
    font-size: 16px;
    color: #b5b5b5;
    
`

export const Border = styled.span`
    border-bottom: 1px solid #b5b5b5;
    position:relative;
    top:5px;
    width:100px;
`

export const LogoImg = styled.img`
    margin:20px 20px;
    cursor:pointer;
    width:40px;
    height:40px;
    text-align:center;
`