import React, { useContext, useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

import {WriterInfo} from "./Comments";

function CommentAddEditForm({
  portfolioOwnerId,
  isEditing,
  setIsEditing,
  isAdding,
  setIsAdding,
  setComments,
  editComment,
  setEditComment
}) {

  const [content, setPutComment] = useState("");

  const {writerId, writerName} = useContext(WriterInfo);

  console.log(writerId);
  console.log(writerName);
   
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isAdding) {
      const userId = portfolioOwnerId;

      // "certificate/create" 엔드포인트로 POST 요청
      await Api.post("comment/create", {
        userId,
        writerId,
        content
      });

      const res = await Api.get(`commentlist/${userId}`);
      setComments(res.data);
      setIsAdding(false);

    }
    else {

      const userId = editComment.userId;

      await Api.put(`comment/${editComment.id}`, {
        userId,
        writerId,
        content
      });

       const res = await Api.get(`commentlist/${userId}`);
       setEditComment(res.data);
       setIsEditing(false); 
    }

  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="certificateAddTitle">
        <Form.Control
          type="text"
          placeholder="리뷰를 남겨주세요."
          value={content}
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
