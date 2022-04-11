import React, { useContext, useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

import {ReviewContext} from "./Comments";

import {WriterInfo} from "./Comments";

function CommentAddEditForm({
  portfolioOwnerId,
  isEditing,
  setIsEditing,
  isAdding,
  review
}) {

  const [comment, setPutComment] = useState("");

  const {writerId, writerName} = useContext(WriterInfo);
  const {reviews, setReview} = useContext(ReviewContext);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isAdding) {
      const userId = portfolioOwnerId;
      // "certificate/create" 엔드포인트로 POST 요청
      await Api.post("comment/create", {
        userId,
        // writerId,
        comment
      });

      const res = await Api.get(`commentlist/${userId}`);
      console.log("getget",res.data);
      setReview(res.data);
      setPutComment("");
    }
    else {
      const userId = review.userId;
      console.log(review._id);

      await Api.put(`comment/${review._id}`, {
        userId,
        writerId,
        comment
      });
       
      console.log(userId);
       const res = await Api.get(`commentlist/${userId}`);
       setReview(res.data);
       setIsEditing(false); 
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="certificateAddTitle">
        <Form.Control
          type="text"
          placeholder="리뷰를 남겨주세요."
          value={comment}
          onChange={(e) => setPutComment(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button 
            mb="10"
            style={{
             border:"none",
             backgroundColor:"#339AF0"
           }} 
           onClick={handleSubmit}
           variant="primary"
            type="submit"
            className="me-3">
            확인
          </Button>
          {isEditing && (
            <Button
                mb="10"
                style={{
                 border:"none",
                 backgroundColor:"#C4C4C4"
               }} 
               variant="secondary" 
               onClick={() => setIsEditing(false)}
               >
                취소
            </Button>
          )}
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CommentAddEditForm;
