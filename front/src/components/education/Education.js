import React, { useState } from "react";
import EducationCard from "./EducationCard";
import EducationAddEditForm from './EducationAddEditForm';

function Education({ education, setEducations,isEditable, deleteHandler }) {
  //useState로 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationAddEditForm
          editEducation={education}
          setEditEducation={setEducations}
          setIsEditing={setIsEditing}
          isEditing = {isEditing}
        />
      ) : (
        <EducationCard
          education={education}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
}

export default Education;
