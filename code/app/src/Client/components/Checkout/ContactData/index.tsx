import { Button, Form } from "react-bootstrap";


export default function () {


  return (
    <Form style={{marginTop: '1rem', padding: '1rem'}}>
      <div style={{fontSize: '18px'}}>
        Ваши контактные данные
      </div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{color: '#0006', marginTop: '1rem'}}>Имя</Form.Label>
        <Form.Control type="email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{color: '#0006'}}>Фамилия</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{color: '#0006'}}>Мобильный телефон</Form.Label>
        <Form.Control type="phone" />
      </Form.Group>
    </Form>
  )
}