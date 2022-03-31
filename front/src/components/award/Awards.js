import React, { useEffect, useState, useContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";

import {UserContext} from "../common/Context";

function Awards() {
  //useState로 awards 상태를 생성
  const [awards, setAwards] = useState([]);
  //useState로 isAdding 상태를 생성
  const [isAdding, setIsAdding] = useState(false);
  const { isEditable, portfolioOwnerId } = useContext(UserContext);

  // 삭제기능
  const deleteHandler = async (id) => {
    try {
      if (window.confirm('정말로 삭제하시겠습니까?')) {
        await Api.delete(`award/${id}`);
        await Api.get(`awardlist/${portfolioOwnerId}`).then((res) => setAwards(res.data));
        alert('삭제가 완료되었습니다.');
      }
    } 
    catch (error) {
      alert('삭제에 실패하였습니다. 다시 시도해주세요.', error)
    }
};

  useEffect(() => {
    try{
  // "awardlist/유저id"로 GET 요청하고, response의 data로 awards를 세팅
  Api.get("awardlist", portfolioOwnerId).then((res) => setAwards(res.data));
    } 
    catch(error){
      console.log(error);
      if (error.response) {
       const { data } = error.response;
       console.error("data : ", data);
     }
    }
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>🏆 수상이력</Card.Title>
        {awards.map((award) => (
          <Award
            key={award.id}
            award={award}
            setAwards={setAwards}
            isEditable={isEditable}
            deleteHandler={deleteHandler}
          />
        ))}
         {isEditable && (
        <Row className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
        <Button
         className='m-3'
         style={{
          border:"none",
          backgroundColor:"#CFD3FF",
          borderRadius:50
        }} 
        onClick={() => setIsAdding(true)}>+</Button>
        </Col>
        </Row>
        )}
        {isAdding && (
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwards={setAwards}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Awards;
