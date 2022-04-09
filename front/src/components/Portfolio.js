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
import CareerSkills from './skill/CareerSkills';
import Comments from './comment/Comments';

function Portfolio(isClick) {
  const navigate = useNavigate();
  const params = useParams();
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

  const fetchPorfolioOwner = async (ownerId) => {
 
    const res = await Api.get("user", ownerId);
    const ownerData = res.data; 
    setPortfolioOwner(ownerData);
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    if (params.userId) {
  
      const ownerId = params.userId;
      fetchPorfolioOwner(ownerId);
    } else {
    
      const ownerId = userState.user.id;
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
        <div className='comments'>
        <Comments userState = {userState}/>
        </div>

        </Col>
      </Row>
    </Container>
     </UserContext.Provider>
  );
}

export default Portfolio;
