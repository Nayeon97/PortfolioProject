import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Form, Button, Modal } from 'react-bootstrap';

import * as Api from '../../../api';
import UserRegister from './UserRegister';
import CompanyRegister from './CompanyRegister';

function RegisterForm({ show, handleClose }) {
  const [distinguishUser, setDistinguishUser] = useState(true); // true -> 개인 회원 , false -> 기업 회원

  return (
    <Modal
      size="lg"
      style={{
        borderRadius: '50px',
      }}
      dialogClassName={'primaryModal'}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      className="loginModal"
    >
      <Modal.Header closeButton onClick={handleClose} />
      <Row className="justify-content-md-center mt-5">
        <Col lg={8}>
          {/* <UserRegister handleClose={handleClose} /> */}
          <CompanyRegister />
        </Col>
      </Row>
    </Modal>
  );
}

export default RegisterForm;
