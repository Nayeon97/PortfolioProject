import React, {useState} from 'react';
import { Form, Button, Col, Row} from 'react-bootstrap';

import * as Api from "../../api";

const ProjectAddEditForm = ({
  portfolioOwnerId, 
  setOpen,
  setProjects, 
  isAdding, 
  setIsAdding,
  editProject,
  setIsEditing,
  setEditProject,
  isEditing
}) => {
  
  const [title, setTitle] = useState(isEditing? editProject.title : "");
  const [content, setContent] = useState(isEditing? editProject.content : "");
  const [fromDate, setFromDate] = useState(isEditing? editProject.fromDate : new Date());
  const [toDate, setToDate] = useState(isEditing? editProject.toDate : new Date());

  const [warning, setWarning] = useState(false);

  const [disable, setDisalbe] = useState(false);

  const selectDate = (event) => {
     if(event.target.value < fromDate) {
       setToDate(new Date());
       console.log(new Date());
       setWarning(true);
       setDisalbe(true);
     }
     else {
      setToDate(event.target.value);
      setWarning(false);     
      setDisalbe(false);
     }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isAdding) {
      const userId = portfolioOwnerId;
      //사용자가 입력한 데이터, post 요청! 
    try{
    // "project/create" 엔드포인트로 post요청함.
   await Api.post("project/create", {
     userId,
     title,
     content,
     fromDate,
     toDate
   });

   // "projectlist/유저id" 엔드포인트로 get요청함.
   const res = await Api.get(`projectlist/${userId}`);
   setProjects(res.data);
   setOpen(false);
   }
   catch(error){
   console.log(error);
   if (error.response) {
     const { data } = error.response;
     console.error("data : ", data);
     }
   }
    }
    else {
      const userId = editProject.userId;

      try{
        await Api.put(`project/${editProject.id}`, {
          userId,
          title,
          content,
          fromDate,
          toDate
        });
    
        const res = await Api.get(`projectlist/${userId}`);
        setEditProject(res.data);
        setIsEditing(false);
      }
      catch(error){
        console.log(error);
        if (error.response) {
         const { data } = error.response;
         console.error("data : ", data);
       }
    };
    }
  };

  
  return (
     <Form onSubmit={handleSubmit}  className="d-grid gap-2">
        <Form.Group>
        <Form.Control
            style={{marginBottom: "20px"}} 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            name="projectTitle"
            value={title}
            placeholder="프로젝트 제목"/>

         <Form.Control
            style={{marginBottom: "20px"}} 
            type="text"
            name="content"
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            placeholder="상세내역" /> 

        <div style={{display: "flex"}}>
        <Form.Control
          className="mr-3"
          style={{width: 200}}
          type="date"
          placeholder="시작날짜"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
          <Form.Control
          className='mr-3'
          style={{width: 200, marginLeft: "10px"}}
          type="date"
          placeholder="종료날짜"
          value={toDate}
          onChange={selectDate}
        />
        </div>
      </Form.Group>
      {warning && (
        <p style={{color:"red"}}>종료날짜가 시작날짜 이전 날짜입니다.</p>
      )}

       <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20}}>
        <Button
         mb="10"
         disabled={disable}
         onClick={handleSubmit}
         style={{
          border:"none",
          backgroundColor:"#339AF0"
        }} 
        variant="primary" 
        type="submit" 
        className="me-3">
         확인
        </Button>
        <Button
         mb="10"
         style={{
          border:"none",
          backgroundColor:"#C4C4C4"
        }} 
        variant="secondary" 
        onClick={(e) => {
          setIsAdding ? setIsAdding(false) : setIsEditing(false);
        }}
        >
         취소
        </Button>
        </Col>
      </Form.Group>
      </Form>

  )}


export default ProjectAddEditForm;