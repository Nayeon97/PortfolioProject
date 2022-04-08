import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import CertificateAddEditForm from "./CertificateAddEditForm";

function Certificate({ certificate, setCertificates, isEditable, deleteHandler }) {
  //useState로 isEditing 상태를 생성
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <>
      {isEditing ? (
        <CertificateAddEditForm
          currentCertificate={certificate}
          setCertificates={setCertificates}
          setIsEditing={setIsEditing}
          isEditing = {isEditing}
        />
      ) : (
        <CertificateCard
          certificate={certificate}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
}

export default Certificate;
