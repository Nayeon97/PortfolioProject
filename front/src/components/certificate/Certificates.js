import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

function Certificates({ portfolioOwnerId, isEditable }) {
  //useState로 certificates 상태를 생성
  const [certificates, setCertificates] = useState([]);
  //useState로 isAdding 상태를 생성
  const [isAdding, setIsAdding] = useState(false);

  // 삭제기능
  const deleteHandler = async (id) => {
    try {
      if (window.confirm('정말로 삭제하시겠습니까?')) {
        await Api.delete(`certificate/${id}`);
        await Api.get(`certificatelist/${portfolioOwnerId}`).then((res) => setCertificates(res.data));
      }
    } 
    catch (error) {
      alert('삭제에 실패하였습니다. 다시 시도해주세요.', error)
    }
};

  useEffect(() => {
    // "certificatelist/유저id"로 GET 요청하고, response의 data로 certificates를 세팅
    Api.get("certificatelist", portfolioOwnerId).then((res) =>
      setCertificates(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>📑 자격증</Card.Title>
        {certificates.map((certificate) => (
          <Certificate
            key={certificate.id}
            certificate={certificate}
            setCertificates={setCertificates}
            isEditable={isEditable}
            deleteHandler={deleteHandler}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button 
                style={{
                  border:"none",
                  backgroundColor:"#CFD3FF",
                  borderRadius:50
                }} 
              onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <CertificateAddForm
            portfolioOwnerId={portfolioOwnerId}
            setCertificates={setCertificates}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificates;
