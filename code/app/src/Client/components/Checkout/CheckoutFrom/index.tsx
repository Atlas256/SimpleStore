import { Button, Form } from "react-bootstrap";




type TProps = {
  onClickCheckout: () => void
}


export default function ({ onClickCheckout }: TProps) {


  return (
    <Form style={{ marginTop: '1rem', padding: '1rem' }}>
      <div style={{ fontSize: '18px' }}>
        Ваши контактные данные
      </div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label style={{ color: '#0006', marginTop: '1rem' }}>Имя</Form.Label>
        <Form.Control type="email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{ color: '#0006' }}>Фамилия</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{ color: '#0006' }}>Мобильный телефон</Form.Label>
        <Form.Control type="phone" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label style={{ color: '#0006' }}>Адрес доставки</Form.Label>
        <Form.Control type="phone" />
      </Form.Group>

      <Button
        onClick={onClickCheckout}
        variant="primary">Заказ потверждаю</Button>
    </Form>
  )
}