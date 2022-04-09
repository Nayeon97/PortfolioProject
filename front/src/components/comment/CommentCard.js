import { useContext } from 'react';
import { Card, Button, Row, Col } from "react-bootstrap";

import {ReviewContext} from "./Comments";

function CommentCard({ comments, isEditable, setIsEditing, deleteHandler, setIsAdding, review }) {

  const {reviews} = useContext(ReviewContext);

  return (
    <Card.Text className='commentCard'>
      <Row className="align-items-center">
      <Col>
      <div style={{
          display: "flex" ,
          marginTop: "10px"
          }}>
        <div className='mvpCardItem'>
        {review.comment}
        </div>
        </div>
        </Col>
        {isEditable && (
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
