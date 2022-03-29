import { Form, Card} from 'react-bootstrap';

function careerSelectForm () {
   return (
     <>
    <Card.Title className='text-start'>경력</Card.Title>
    <Form.Select aria-label="Default select example" 
     style={{
     width: "200px",
     marginBottom: "20px"
     }}>
     <option value=''>선택안함</option>
     <option value="1~2">1~2년</option>
     <option value="3~4">3~4년</option>
     <option value="5~6">5~6년</option>
     <option value="7~8">7~8년</option>
    </Form.Select>
    </>
   )
}

export default careerSelectForm;