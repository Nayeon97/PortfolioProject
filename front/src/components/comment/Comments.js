import React, { createContext, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import * as Api from "../../api";
import Comment from "./Comment";

import CommentAddEditForm from "./CommentAddEditForm";
import {UserContext} from "../common/Context";

// const dummyList = 
// [
//   {
//     id: 1,
//     author: "김나연",
//     content: "댓글",
//   }
// ]

export const WriterInfo = createContext(null);

function Comments({userState}) {
  
  const [comments, setComments] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const {isEditable, portfolioOwnerId } = useContext(UserContext);

  const writerId = userState.user?.id;
  const writerName = userState.user?.name;
  
  // 삭제기능
    const deleteHandler = async (id) => {
      try {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
          await Api.delete(`comment/${id}`);
          await Api.get(`commentlist/${portfolioOwnerId}`).then((res) => (res.data));
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
      setComments(res.data));
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

  return (
    <WriterInfo.Provider value={writerContext}>
        <Card className="mb-3">
        <Card.Header as="h5">댓글</Card.Header>
        <Card.Body>
        { comments.map((comment) => (
            <Comment
                  key = {comment.id} 
                  comments={comments} 
                  setComments= {setComments}
                  isEditable = {isEditable}
                  deleteHandler={deleteHandler}
              />         
            ))}
       <div style={{marginTop: "50px"}}>
       <CommentAddEditForm 
          portfolioOwnerId = {portfolioOwnerId}
          isAdding = {isAdding}
          setIsAdding = {setIsAdding}
          setComments = {setComments}
          />
       </div>
        </Card.Body>
      </Card>
    </WriterInfo.Provider>
  );
}

export default Comments;
