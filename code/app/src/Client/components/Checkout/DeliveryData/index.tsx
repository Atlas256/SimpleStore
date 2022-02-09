import { Button, Form } from "react-bootstrap";


export default function () {


  return (
    <Form style={{ marginTop: '1rem', padding: '1rem' }}>
      <div style={{ fontSize: '18px' }}>
        Данный доставки
      </div>

      <Form.Group>
        <Form.Label style={{ color: '#0006', marginTop: '1rem' }}>Город</Form.Label>
        <Form.Select aria-label="Default select example">
          <option value="1">Киев</option>
          <option value="2">Днепр</option>
          <option value="3">Запорожье</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label style={{ color: '#0006', marginTop: '1rem' }}>Адрес</Form.Label>
        <Form.Select aria-label="Default select example">
          <option value="1">ул. Коммунальная, 9</option>
          <option value="2">ул. Европейская, 44</option>
          <option value="3">пр. Соборный, 27</option>
        </Form.Select>
      </Form.Group>

    </Form>
  )
}