import React, { useState } from 'react';
import { Col, Row, Form, Button, Modal } from 'react-bootstrap';
import * as Api from '../../../api';

const CompanyRegister = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [contact, setContact] = useState('');

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;
  const isPositionValid = position.length >= 1;
  const isContactValid = contact.length >= 1;
  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isPasswordSame &&
    isNameValid &&
    isPositionValid &&
    isContactValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post('user/register', {
        email,
        password,
        name,
      });
      handleClose(false);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      e.target.reset();
      alert('회원가입이 완료되었습니다.😄');
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        console.error('data : ', data);
        alert(data.error);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        e.target.reset();
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="registerName">
              <Form.Label>관리자 성함</Form.Label>
              <Form.Control
                type="text"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {!isNameValid && (
                <Form.Text className="text-success">
                  이름은 2글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="registerPosition">
              <Form.Label>직책</Form.Label>
              <Form.Control
                type="position"
                autoComplete="off"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
              {!isPositionValid && (
                <Form.Text className="text-success">
                  직책을 기재해주세요.
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="registerContact">
          <Form.Label>연락처</Form.Label>
          <Form.Control
            type="position"
            autoComplete="off"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          {!isContactValid && (
            <Form.Text className="text-success">
              연락처를 기재해주세요.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="registerEmail">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control
            type="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isEmailValid && (
            <Form.Text className="text-success">
              이메일 형식이 올바르지 않습니다.
            </Form.Text>
          )}
        </Form.Group>

        <Row>
          <Col>
            <Form.Group controlId="registerPassword" className="mt-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isPasswordValid && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상으로 설정해 주세요.
                </Form.Text>
              )}
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="registerConfirmPassword" className="mt-3">
              <Form.Label>비밀번호 재확인</Form.Label>
              <Form.Control
                type="password"
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!isPasswordSame && (
                <Form.Text className="text-success">
                  비밀번호가 일치하지 않습니다.
                </Form.Text>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button
              variant="primary"
              type="submit"
              disabled={!isFormValid}
              style={{ marginBottom: '20px' }}
            >
              회원가입
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default CompanyRegister;
