import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Row, Card } from "react-bootstrap";
import { UserStateContext } from "../App";
import * as Api from "../api";

import { UserContext } from './common/Context';

import './user/Style.css';

import User from "./user/User";
import Educations from './education/Educations';
import Awards from "./award/Awards";
import Certificates from "./certificate/Certificates";
import Projects from './project/Projects';
import CareerSkills from './skill/CareerSkills'

function Portfolio(isClick) {
  const navigate = useNavigate();
  const params = useParams();
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

  const fetchPorfolioOwner = async (ownerId) => {
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    const res = await Api.get("user", ownerId);
    // 사용자 정보는 response의 data임.
    const ownerData = res.data;
    // portfolioOwner을 해당 사용자 정보로 세팅함.
    setPortfolioOwner(ownerData);
    // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    if (params.userId) {
      // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    } else {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      const ownerId = userState.user.id;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  const userContext = {
    isEditable: portfolioOwner.id === userState.user?.id,
    portfolioOwnerId: portfolioOwner.id,
    portfolioOwner: portfolioOwner
  }
  return (
     <UserContext.Provider value={userContext}>
        <Container className='mypage'>
      <Row>
        <Col>
        <button
          className='backHomeBtn'
          onClick={() => navigate("/")}
        >
          ←
        </button>
        <div className='portfolioTitle'>
        <div className='name'>
           <h1>{portfolioOwner.name} 포트폴리오</h1>
        </div>
        </div>
         <h1 className='line'></h1>
         {portfolioOwner.id === userState.user?.id ?
          (
            <>
            <User isClick = {isClick}/>
            </>
          )
          :
          (
            <>
             <Card className='email'>
            <Card.Body>
            <Card.Title>📧 이메일</Card.Title>
            <Card.Text>{portfolioOwner.email}</Card.Text>
            </Card.Body>
          </Card>
          <Card className='introduce'>
            <Card.Body>
              <Card.Title>👋 간단한 소개</Card.Title>
              <Card.Text>{portfolioOwner.description}</Card.Text>
            </Card.Body>
          </Card>
            </>
          )
        }
        <div className='projects'>
        <Projects/>
        </div>
        <div className='educations'>
        <Educations/>
        </div>
        <div className='awards'>
        <Awards/>
        </div>
        <div className='certificates'>
        <Certificates/>
        </div>
        <div className='CareerSkill'>
        <CareerSkills/>
        </div>
        </Col>
      </Row>
    </Container>
     </UserContext.Provider>
  );
}

export default Portfolio;
