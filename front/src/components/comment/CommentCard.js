import { useContext } from 'react';
import { Card, Button, Row, Col } from "react-bootstrap";

import {WriterInfo} from "./Comments";

function CommentCard({ comments, isEditable, setIsEditing, deleteHandler, setIsAdding, review }) {

  const {writerId} = useContext(WriterInfo);
  console.log(review);

  return (
    <Card.Text className='commentCard'>
      <Row className="align-items-center">
      <Col>
      <div style={{
          display: "flex" ,
          marginTop: "10px",
          padding: "3px"
          }}>
        <div style={{backgroundColor: "#ececec", display: "flex",marginRight: "10px"}}>
        <div  style={{
          marginRight: "3px"
          }}>
           작성자:
        </div>
        {review.writerName}
        </div>
        <div className='mvpCardItem'>
        {review.comment}
        </div>
        </div>
        </Col>
        {writerId === review.writerId && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing(true) && setIsAdding(false)}
              className="mr-3 mb-1"
            >
              편집
            </Button>
            <Button
              className="mr-3"
              variant="outline-danger"
              size="sm"
              onClick={() => deleteHandler(review._id)}
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
