import React, { useState } from "react";
import CommentAddEditForm from './CommentAddEditForm';
import CommentCard from './CommentCard';

function Comment({comments, setComments, isEditable, deleteHandler}) {
  const [isEditing, setIsEditing] = useState(false);
  return (
     <>
       {isEditing ? (
        <CommentAddEditForm 
         editComment={comments}
         setEditComment={setComments} 
         setIsEditing={setIsEditing} 
         isEditing = {isEditing}

         />
      ) : (
        <CommentCard 
        comments={comments} 
        setIsEditing={setIsEditing} 
        isEditable={isEditable} 
        deleteHandler = {deleteHandler} 
         />
      )}
     </>
  );
}

export default Comment;