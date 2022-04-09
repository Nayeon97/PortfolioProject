import React, { useEffect, useContext, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

import getSkill from "../common/skill";
import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

import './Style.css';

function SectionHome() {
  const userState = useContext(UserStateContext);
  const [career, setCareer] = useState("0");
  const [languageList, setLanguageList] = useState("0");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState]);

  console.log(users);

  const onClick = async(e) => {
    e.preventDefault();
    //  const res = await Api.get(`skillListBySearch`, career);
    //  setUsers(res.data);

    const res = await Api.get(`skillListBySearch/${career}/${languageList}`);
    setUsers(res.data);
  }

  return (
    <>
    <div className='sectionHomeSelect'>
    <Form.Select aria-label="Default select example" 
      key={career}
      defaultValue={career}
      value={career}
      onChange={(e) => setCareer(e.target.value)}
      name="career"
    style={{
      width: "200px",
      marginBottom: "20px"
    }}>
      <option value="0">경력</option>
      <option value="1~2">1~2년</option>
      <option value="3~4">3~4년</option>
      <option value="5~6">5~6년</option>
      <option value="7~8">7~8년</option>
     </Form.Select>
     <Form.Select 
     aria-label="Default select example"
     name="language"
     onChange={(e) => setLanguageList(e.target.value)}
     value={languageList}
    style={{
      width: "200px",
      marginBottom: "20px",
      marginLeft: "13px"
    }}>
    {  getSkill.map((skill, index) => {
        return (<option key={index} value={skill.value}>{skill.value || skill.name}</option>)
       })
        }
      </Form.Select>
      <Button 
         mb="10"
         style={{
          border:"none",
          backgroundColor:"#339AF0",
          marginLeft: "20px",
          height: "40px"
        }}  
       variant="primary" 
       type="submit" 
       className="me-3"
       onClick={onClick}>
        검색
      </Button>
    </div>
    {/*  */}
     <Container className='my-2 ms-9'> 
      <div className='homeUsers'>
        {users.map((user) => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </div>
    </Container>
    </>
  );
}

export default SectionHome;
