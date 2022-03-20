import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Col className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src="http://placekitten.com/200/200"
            alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
          />
        </Col>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle>{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>
        <Card.Footer>{user?.visited}</Card.Footer>
        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
              <Button
               mb="10"
               style={{
                border:"none",
                backgroundColor:"#339AF0",
                color: "#fffff"
                }} 
                size="sm"
                onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
