import { useMemo, useState } from "react";
import { Button, Form } from "react-bootstrap";




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
  'a': {
    text: 'Имя',
    type: 'text',
    value: undefined,
    validate: {
      errorText: 'Пример: Name (макс. 14 символов)',
      regex: /^[a-zA-Z ]{6,14}$/
    }
  },
  'b': {
    text: 'Email',
    type: 'email',
    value: undefined,
    validate: {
      errorText: 'Некорректно введенный почта',
      regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  'c': {
    text: 'Телефон',
    type: 'tel',
    value: undefined,
    validate: {
      errorText: 'Некорректно введенный номер телефона',
      regex: /^[0-9 ]{6,12}$/
    }
  }
}


type TInputFields = { [key: string]: TFormField }
type TSetInputFields = React.Dispatch<React.SetStateAction<{ [key: string]: TFormField }>>
type TSetErrors = React.Dispatch<React.SetStateAction<{ [key: string]: string }>>



const handlerChangeInput =
  (inputFields: TInputFields, setInputFields: TSetInputFields, setErrors: TSetErrors) => (value: string, key: string) => {




    //validation
    if (inputFields[key]['validate']['regex'].test(value)) {
      const newInputFields = { ...inputFields };
      newInputFields[key]['value'] = value;

      setErrors(prev => {
        delete prev[key]
        return prev
      })
      setInputFields(newInputFields)
    } else {
      setErrors(prev => {
        return { ...prev, [key]: '' }
      })
    }

  }




type TProps = {
  onClickCheckout: () => void
}


export default function ({ onClickCheckout }: TProps) {

  const [inputFields, setInputFields] = useState<{ [key: string]: TFormField }>(initInputFields)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})




  useMemo(() => {
    console.log(inputFields);
  }, [inputFields])


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
        onClick={onClickCheckout}
        variant="primary">
        Заказ потверждаю
      </Button>
    </Form>
  )
}

