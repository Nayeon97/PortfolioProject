import {useState, useEffect ,useRef} from 'react';
import { Card, Row, Button, Col } from "react-bootstrap";
import ProjectAddForm from './ProjectAddForm';
import Project from './Project';
import * as Api from "../../api";

// 제일 상위 컴포넌트! 
const Projects = ({portfolioOwnerId, isEditable}) => {
  console.log(portfolioOwnerId)
  const [open, setOpen] = useState(false); // Add 버튼 누르면 open!
  const [projects, setProjects] = useState([]);
  
   useEffect(() => {
    try{
      Api.get(`projectlist/${portfolioOwnerId}`).then((res) =>
      setProjects(res.data));
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
        <Card.Title className='text-start'>프로젝트</Card.Title>
        { projects.map((project) => (
          <Project 
              key={project.id}
              project={project} 
              setProjects= {setProjects}
              isEditable = {isEditable}
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
        onClick={() => setOpen(true)}>+</Button>
        </Col>
        </Row>
        )}
          {open && (
          <ProjectAddForm  
           portfolioOwnerId = {portfolioOwnerId}
           setOpen = {setOpen}
           setProjects = {setProjects}
          />
        )}
     </Card.Body>
   </Card> 
   );
}

export default Projects;