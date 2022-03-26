import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col, Image } from "react-bootstrap";
import * as Api from "../../api";

import './Style.css';

// homeUser
function UserCard({ user,setIsEditing, isEditable, isNetwork, isClick }) {
  const navigate = useNavigate();

  // 탈퇴기능
  const deleteUser = async (id) => {
    try {
      if (window.confirm('정말로 탈퇴하시겠습니까? 😢')) {
        await Api.delete(`user/${id}`);
        sessionStorage.clear(); // 모든 데이터 삭제
        alert('탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
        window.location.href="/";
      }
    } 
    catch (error) {
      alert('탈퇴에 실패하였습니다. 다시 시도해주세요.', error)
    }
    
};

  const onClick = () => {
   navigate(`/user/${user.id}`);
  }

  return (
     <Card className={isClick ? "myPageCard" : "homeUserCard"} >
      <Card.Body style={{textAlign: "center"}}>
        <Col className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" , marginTop: "20px" }}
            className="mb-3"
            src={('./imgs/lion.png')}  
          />
        </Col>
        <div className='userName'>{user?.name}</div>
        <div className='userEmail'>{user?.email}</div>
        {isEditable && (
          <Col>
           <div>{user?.description}</div>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  mb="10"
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  className="ml-3 mr-3"
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteUser(user.id)}
                >
                  회원탈퇴
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <div style={{display: "flex", marginLeft:"10px",marginTop: "50px"}}>
          <button
            className='networkBtn'
            onClick={onClick}>
               🚀  
           </button>
           <div>
           <Image className="homeImg" src={('./imgs/eye.png')}/>
           </div>
           <div className='clickCount'  style={{color: "#868e96"}}>{user.visited}</div>
          </div>
        )}
      </Card.Body>
      </Card>
  );
}

export default UserCard;

//  className='clickCount'
