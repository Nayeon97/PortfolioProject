import React, { createContext, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import * as Api from "../../api";
import Comment from "./Comment";

import CommentAddEditForm from "./CommentAddEditForm";
import {UserContext} from "../common/Context";

export const WriterInfo = createContext(null);
export const ReviewContext = createContext(null);

function Comments({userState}) {
  
  const [reviews, setReview] = useState([]);
  const [isAdding, setIsAdding] = useState(true);

  const {isEditable, portfolioOwnerId } = useContext(UserContext);

  const writerId = userState.user?.id;
  const writerName = userState.user?.name;
  
  // 삭제기능
    const deleteHandler = async(id) => {
      try {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
          await Api.delete(`comment/${id}`);
          Api.get(`commentlist` ,portfolioOwnerId).then((res) => setReview(res.data));
          alert('삭제가 완료되었습니다.');
        }
      } 
      catch (error) {
        alert('삭제에 실패하였습니다. 다시 시도해주세요.', error)
      }
  };
  

  useEffect(() => { 
    try{
      Api.get(`commentlist` ,portfolioOwnerId).then((res) =>
      setReview(res.data));
    } 
    catch(error){
      console.log(error);
      if (error.response) {
       const { data } = error.response;
       console.error("data : ", data);
     }
    }
      }, [portfolioOwnerId]);

  const writerContext = {
    writerId,
    writerName
  }

  const reviewContext = {
    reviews,
    setReview
  }

  return (
     <ReviewContext.Provider value={reviewContext}>
           <WriterInfo.Provider value={writerContext}>
        <Card className="mb-3">
        <Card.Header as="h5">댓글</Card.Header>
        <Card.Body>
        { reviews.map((review) => (
            <Comment
                  key = {review._id} 
                  isEditable = {isEditable}
                  deleteHandler={deleteHandler}
                  setIsAdding = {setIsAdding}
                  review = {review}
              />         
            ))}
       <div style={{marginTop: "50px"}}>
       <CommentAddEditForm 
          portfolioOwnerId = {portfolioOwnerId}
          isAdding = {isAdding}
          setIsAdding = {setIsAdding}
          />
       </div>
        </Card.Body>
      </Card>
    </WriterInfo.Provider>
     </ReviewContext.Provider>
  );
}

export default Comments;
