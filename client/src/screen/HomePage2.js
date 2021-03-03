import React, {useState} from 'react';
import {BrowserRouter, Route, Link, withRouter} from 'react-router-dom'
import yonal_logo from '../image/yonal_logo.png'
import GoogleButton from '../component/GoogleButton'
import {useMediaQuery} from 'react-responsive'

const HomePage2 = ({history}) => {
  const [isLogin, setIsLogin] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userImage, setUserImage] = useState(null);

  const sendData = (name, email, image, isLogin) => {
    setIsLogin(isLogin);
    setUserName(name);
    setUserEmail(email);
    setUserImage(image);
  };

  const Logout = () => {
    setIsLogin(false);
    setUserName(null);
    setUserEmail(null);
    setUserImage(null);
  };

  const isMobile = useMediaQuery ({
    query : "(max-width : 500px)"
  })

  const nicknameGuide = isMobile? 'mNicknameGuide' : 'nicknameGuide';

  if(localStorage.getItem("userName")){
    history.push({
      pathname: "/loginhome", 
  });
    return null;
  }
  
  return (
  <div>
      <div className='logoText'>우리 모두 일정 맞추기</div>
      <Link to={{pathname: '../'}}>
        <img className='Applogo' src={yonal_logo}/>  
      </Link>
      <GoogleButton className = 'googleBtn' sendData={(e) => sendData}/>
      <div className='loginGuide'>요날을 이용하시려면 로그인을 해주세요.</div>
      
  </div>
  );
}

export default withRouter(HomePage2);