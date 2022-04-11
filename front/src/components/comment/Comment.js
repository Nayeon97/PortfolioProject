import React, { useState } from "react";
import CommentAddEditForm from './CommentAddEditForm';
import CommentCard from './CommentCard';

function Comment({setIsAdding,isEditable, deleteHandler, review}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
     <>
       {isEditing ? (
        <CommentAddEditForm 
         setIsEditing={setIsEditing} 
         isEditing = {isEditing}
         review = {review}
         />
      ) : (
        <CommentCard 
        setIsEditing={setIsEditing} 
        isEditable={isEditable} 
        deleteHandler = {deleteHandler} 
        setIsAdding ={setIsAdding}
        review = {review}
         />
      )}
     </>
  );
}

export default Comment;