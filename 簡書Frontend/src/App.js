import GlobalStyle from './style';
import 'antd/dist/antd.css';
import "./index.css"
import GlobalIcon from "./statics/iconfont/iconfont";
import {Header} from "./common/header";
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter,Route,useLocation} from "react-router-dom";
import Home from "./pages/home/loadable";
import Detail from "./pages/detail/loadable";
import Write from "./pages/write/loadable";
import {Fragment, useEffect} from 'react'
import Login from "./pages/login/loadable";
import Register from "./pages/register/loadable";
import UserPage from "./pages/userPage/loadable";
import Setting from "./pages/setting/loadable";
import Article from "./pages/article/loadable";
import {ChangeLogin} from "./pages/login/store/actionCreators";
import {Spin} from "antd";

function App() {
    const location = useLocation();
    const username = localStorage.getItem("username");
    const userPic = localStorage.getItem("userPic");
    const userEmail = localStorage.getItem("userEmail");
    const userid = localStorage.getItem("userid");
    const userPostNum = localStorage.getItem("userPostNum");
    const dispatch = useDispatch();
    const loading = useSelector(state => state.get("header").loading);
    document.title = "簡書";
    useEffect(()=>{
        window.scrollTo(0,0);
    },[location])
    useEffect(()=>{
        if (username){
            dispatch(ChangeLogin(username,userPic,userEmail,userid,userPostNum));
        }
    },[])
  return (
    <div>
        <GlobalStyle />
        <GlobalIcon />
        <Header />
        <Route path = '/' exact component={Home} />
        <Route path = '/detail' exact component={Detail} />
        <Route path = '/register' exact component={Register} />
        <Route path = '/login' exact component={Login} />
        <Route path = '/write' exact component={Write} />
        <Route path = '/user' exact component={UserPage} />
        <Route path = '/setting' exact component={Setting} />
        <Route path = '/article' exact component={Article} />
    </div>
  );
}

export default App;
