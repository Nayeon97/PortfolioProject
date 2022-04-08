import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectAddEditForm from "./ProjectAddEditForm";

function Project({ project, setProjects , isEditable, deleteHandler }) {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <>
      {isEditing ? (
        <ProjectAddEditForm
          editProject={project}
          setEditProject={setProjects}
          setIsEditing={setIsEditing}
          isEditing = {isEditing}
        />
      ) : (
        <ProjectCard
          project={project}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
}

export default Project;
