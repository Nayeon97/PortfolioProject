import { Form } from 'react-bootstrap';

function skillSelectForm () {
  const skills =[{value: '', name:'선택안함'}, {value: 'Java'}, {value: 'Javasript'}, {value: 'jquery'},
  {value: 'Python'},{value: 'Html5'},{value: 'Css3'},{value: 'node.js'},
  {value: 'react'},{value: 'mongodb'},{value: 'mongoose'}, {value: 'django'},
  {value: 'mysql'}, {value: 'aws'}, {value: 'linux'}, {value: 'spring framework'}];

   return (
    <Form.Select
    aria-label="Default select example" 
    style={{
      width: "200px",
      marginBottom: "20px",
      marginLeft: "20px"
    }}
    >
      {skills.map((skill, index) => {
        return (<option key={index} value={skill.value}>{skill.value || skill.name}</option>)
       })
        }
    </Form.Select>
  )
}


export default skillSelectForm;

