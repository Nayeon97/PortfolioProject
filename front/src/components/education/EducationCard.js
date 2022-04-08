import React from 'react'
import { Card, Row, Col, Button} from "react-bootstrap";
import * as Api from '../../api'
import EducationAddEditForm from './EducationAddEditForm';

/**
 * 학력 목록 컴포넌트입니다.
 * item : EducationForm 에서 전달받음.
 */
const EducationCard = ({ education, isEditable, isEditing ,setIsEditing, setEducations, deleteHandler }) => {

  return (
    <Card.Text className='text-start'>
      <Row className="align-items-start">
        <Col>
         <div style={{
          display: "flex" ,
          marginTop: "10px"
          }}>
        <div className='mvpCardItem'>
           {education.school}
            </div>
        <div className='mvpCardItem2'>
         {`${education.major} (${
            education.position || ""
          })`}
        </div>
        </div>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="mr-3 mb-1"
            >
              편집
            </Button>
            <Button
              className="mr-3"
              variant="outline-danger"
              size="sm"
              onClick={() => deleteHandler(education.id)}
            >
              삭제
            </Button>
          </Col>
        )}
        {isEditing  && (
          <EducationAddEditForm />
        )}
      </Row>
    </Card.Text>
  );

}

export default EducationCard;
