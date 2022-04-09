import {useState, useEffect ,useContext} from 'react';
import { Card, Row, Button, Col } from "react-bootstrap";
import EducationAddEditForm from './EducationAddEditForm';
import Education  from './Education';
import * as Api from "../../api";

import {UserContext} from "../common/Context";

const Educations = () => {
  
  const [educations, setEducations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const { isEditable, portfolioOwnerId } = useContext(UserContext);
  // 삭제기능
  const deleteHandler = async (id) => {
    try {
      if (window.confirm('정말로 삭제하시겠습니까?')) {
        await Api.delete(`education/${id}`);
        await Api.get(`educationlist/${portfolioOwnerId}`).then((res) => setEducations(res.data));
        alert('삭제가 완료되었습니다.');
      }
    } 
    catch (error) {
      alert('삭제에 실패하였습니다. 다시 시도해주세요.', error)
    }
};

  
   useEffect(() => { 
    try{
      Api.get(`educationlist` ,portfolioOwnerId).then((res) =>
      setEducations(res.data));
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
            <Card.Title className='text-start'>🎓 학력</Card.Title>
            { educations.map((education) => (
              <Education
                  key = {education.id} 
                  education={education} 
                  setEducations= {setEducations}
                  isEditable = {isEditable}
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
              <EducationAddEditForm  
               portfolioOwnerId = {portfolioOwnerId}
               setEducations = {setEducations}
               isAdding = {isAdding}
               setIsAdding = {setIsAdding}
               educations = {educations} 
              />
            )}
         </Card.Body>
       </Card> 
       );
}

export default Educations;
