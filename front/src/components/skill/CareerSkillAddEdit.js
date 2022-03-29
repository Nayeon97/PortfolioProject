import React, { useState } from 'react';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import * as Api from "../../api";

import SkillSelectForm from '../common/skill';
import CareerSelectForm from '../common/career';

const CareerSkillAddEdit = ({
  portfolioOwnerId,
  portfolioOwner,
  isEditable,
  skills,
  setSkill,
  setOpen,
  checkData }) => {

  const [career, setCareer] = useState("");
  const [language, setLanguage] = useState({
    language1: "",
    language2: "",
    language3: ""
  })

  const [languageList, setLanguageList] = useState([]);

  // language => post , languageList => get 
  const onChangeLanguage = (e) => {
    console.log("ㅇㄹㅇ");
    setLanguage(cur => {
      return {
        ...cur,
        [e.target.name]: e.target.value
      }
    })
    setLanguageList([...languageList, e.target.value]);
  }

  const onChangeCareer = (e) => {
    const value = e.target.value;
    setCareer(value);
  }

  // 저장 (career, language data 없을때)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = portfolioOwnerId;

    console.log(languageList);
    try {
      await Api.post("skill/create", {
        portfolioOwner,
        userId,
        career,
        languageList
      });

      const res = await Api.get(`skilllist/${userId}`);
      setSkill(res.data);
    }
    catch (error) {
      console.log(error);
      if (error.response) {
        const { data } = error.response;
        console.error("data : ", data);
      }
    }
    setOpen(false);
  };

  // 편집 (career, language data 가 존재하면 편집!)
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const userId = skills[0].userId;
    try {
      await Api.put(`skill/${skills[0].id}`, {
        userId,
        career,
        languageList
      });

      // "projectlist/유저id" 엔드포인트로 get요청함.
      const res = await Api.get(`skillList/${userId}`);
      setSkill(res.data);
      console.log(skills);
    }
    catch (error) {
      console.log(error);
      if (error.response) {
        const { data } = error.response;
        console.error("data : ", data);
      }
    }
    setOpen(false);
  };

  return (
    <Card className="skillCard">
      <Card.Body>
        <Form.Group>
          <CareerSelectForm
          key={career}
          onChange={onChangeCareer} 
          defaultValue={career}     
           name="career"
          ></CareerSelectForm>
        </Form.Group>
        <Card.Title className='text-start'>주요 기술</Card.Title>
        <Form.Group>
          <Row>
            <SkillSelectForm
            disabled={ isEditable === false ? true : false}
            name="language1"
            onChange={onChangeLanguage}
            value={language.language1}       
            ></SkillSelectForm>
            <SkillSelectForm
             disabled={ isEditable === false ? true : false}
             name="language2"
             onChange={onChangeLanguage}
             value={language.language2}
        ></SkillSelectForm>
            <SkillSelectForm
             disabled={ isEditable === false ? true : false}
             name="language3"
             onChange={onChangeLanguage}
             value={language.language3}
        ></SkillSelectForm>
          </Row>
        </Form.Group>
        {checkData === true ?
          (
            <Col>
              <Row className="mt-3 text-center text-info">
                <Col sm={{ span: 20 }}>
                  <Button
                    mb="10"
                    style={{
                      border: "none",
                      backgroundColor: "#339AF0",
                      color: "#fffff"
                    }}
                    size="sm"
                    onClick={handleEditSubmit}
                  >
                    편집
                  </Button>
                </Col>
              </Row>
            </Col>
          ) :
          (
            <Col>
              <Row className="mt-3 text-center text-info">
                <Col sm={{ span: 20 }}>
                  <Button
                    mb="10"
                    style={{
                      border: "none",
                      backgroundColor: "#339AF0",
                      color: "#fffff"
                    }}
                    size="sm"
                    onClick={handleSubmit}
                  >
                    추가
                  </Button>
                </Col>
              </Row>
            </Col>
          )
        }
      </Card.Body>
    </Card>
  )
}

export default CareerSkillAddEdit;
