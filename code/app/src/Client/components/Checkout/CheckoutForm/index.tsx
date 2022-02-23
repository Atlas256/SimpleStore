import { useMemo, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../../hooks/redux";




type TFormField = {
  text: string,
  type: string,
  value: string | undefined,
  validate: {
    errorText: string,
    regex: any
  }
}

const initInputFields: { [key: string]: TFormField } = {
  'name': {
    text: 'Имя',
    type: 'text',
    value: 'David Nollan',
    validate: {
      errorText: 'Пример: Name (макс. 14 символов)',
      regex: /^[a-zA-Z ]{6,14}$/
    }
  },
  'email': {
    text: 'Email',
    type: 'email',
    value: 'test@gmail.com',
    validate: {
      errorText: 'Некорректно введенный почта',
      regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  'phone': {
    text: 'Телефон',
    type: 'tel',
    value: '+380 988 78 78 24',
    validate: {
      errorText: 'Некорректно введенный номер телефона',
      regex: /^[0-9\+ ]{0,17}$/
    }
  },
  'deliveryAddress': {
    text: 'Адресс доставки',
    type: 'text',
    value: 'ул. Коммунальная, 22а, кв 78',
    validate: {
      errorText: 'Некорректно введенный адресс',
      regex: /^[0-9A-za-zА-Яа-я., ]{0,64}$/
    }
  }
}


export type TInputFields = { [key: string]: TFormField }
type TSetInputFields = React.Dispatch<React.SetStateAction<{ [key: string]: TFormField }>>
type TSetErrors = React.Dispatch<React.SetStateAction<{ [key: string]: string }>>



const handlerChangeInput =
  (inputFields: TInputFields, setInputFields: TSetInputFields, setErrors: TSetErrors) => (value: string, key: string) => {

    const newInputFields = { ...inputFields };
    newInputFields[key]['value'] = value;
    setInputFields(newInputFields)

    if (inputFields[key]['validate']['regex'].test(value)) {
      setErrors(prev => {
        delete prev[key]
        return prev
      })
    } else {
      setErrors(prev => {
        return { ...prev, [key]: '' }
      })
    }
  }




type TProps = {
  onClickCheckout: (inputFields: TInputFields) => () => void
}


export default function ({ onClickCheckout }: TProps) {

  const [inputFields, setInputFields] = useState<{ [key: string]: TFormField }>(initInputFields)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})




  const onChangeInput = handlerChangeInput(inputFields, setInputFields, setErrors)


  return (
    <Form style={{ marginTop: '1rem', padding: '1rem' }}>
      <div style={{ fontSize: '18px' }}>
        Ваши контактные данные
      </div>

      {
        Object.entries(inputFields).map(([key, input]: [key: string, input: TFormField]) =>
          <Form.Group
            key={key}
            className="mb-3"
            controlId={input.type}>
            <Form.Label
              style={{ color: '#0006', marginTop: '1rem' }}>{input.text}</Form.Label>
            <Form.Control
              value={inputFields[key].value}
              onChange={e => onChangeInput(e.target.value, key)}
              style={{ boxShadow: 'none', border: (errors[key] === '') ? '1px solid red' : '1px solid #0004' }}
              type={input.type} />
          </Form.Group>
        )
      }

      <Button
        disabled={Object.keys(errors).length !== 0 ? true : false}
        onClick={onClickCheckout(inputFields)}
        variant="primary">
        Заказ потверждаю
      </Button>
    </Form>
  )
}

