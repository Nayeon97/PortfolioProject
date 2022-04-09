import { Card, Button, Row, Col } from "react-bootstrap";

function CommentCard({ comments, isEditable, setIsEditing, deleteHandler }) {

  return (
    <Card.Text className='commentCard'>
      <Row className="align-items-center">
      <Col>
      <div style={{
          display: "flex" ,
          marginTop: "10px"
          }}>
        <div className='mvpCardItem'>
        {comments[0].author}
        </div>
        <div className='mvpCardItem'>
        {comments[0].content}
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
              onClick={() => deleteHandler(comments.id)}
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default CommentCard;
