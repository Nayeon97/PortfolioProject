import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Nav, Navbar, Container} from "react-bootstrap";
import { UserStateContext, DispatchContext } from "../App";
import LoginForm from './user/LoginForm';

function Header({showLogin, showRegister}) {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const [isClick, setIsClick] = useState(false);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    sessionStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };


  // Navbar fixed = "top"
  return (
    <div>
      <Navbar fixed = "top" expand="lg" style={{backgroundColor:"#228be6"}}> 
        <Container>
           <Nav.Item>
           <Nav.Link style={{
             color: "black",
             fontSize: "20px",
             fontWeight: "bold"
          }} onClick={() => navigate("/")}>🦁</Nav.Link>
           </Nav.Item>
           <Nav>
           {isLogin ? (
             <>
              <Nav.Item>
                <Nav.Link style={{color:"black"}} onClick={logout}>로그아웃</Nav.Link>
               </Nav.Item>
               <Nav.Item> 
                <Nav.Link  
                style={{color:"white"}} 
                onClick={(prev) => {navigate("/mypage") && setIsClick(!prev)}}
                isClick = {isClick}
                >마이 페이지</Nav.Link>
               </Nav.Item>
             </>
           ) 
           : (
            <> 
            <Nav.Item>
            <Nav.Link  
             style={{color:"black"}}
             onClick={showLogin} >로그인</Nav.Link>
             </Nav.Item>
             <Nav.Item> 
             <Nav.Link onClick={showRegister}>회원가입</Nav.Link>
             </Nav.Item>
           </> )}
           </Nav>
        </Container>
    </Navbar>
    </div>
  );
}
// onClick{() => navigate("/login")}
//to={{pathname: "/login" , state:{background: location}}}

export default Header;
