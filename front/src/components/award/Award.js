import React, { useState } from "react";
import AwardAddEditForm from "./AwardAddEditForm";
import AwardCard from "./AwardCard";

function Award({ award, setAwards, isEditable, deleteHandler }) {
  //useState로 isEditing 상태를 생성
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <>
      {isEditing ? (
        <AwardAddEditForm
          currentAward={award}
          setAwards={setAwards}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
        />
      ) : (
        <AwardCard
          award={award}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
}

export default Award;
