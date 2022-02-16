import styled from 'styled-components'
import { Card, Button, Image } from "react-bootstrap";
import { TPropduct } from '../../types';
import { NavigateFunction, useNavigate } from 'react-router';



type TAddedProduct = {
  count: number
}


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const localStorage = window.localStorage;

const handlerAddCartProduct = (productID: string) => () => {
  let addedProducts: { [key: string]: TAddedProduct } = {}
  if (localStorage.getItem("addedProducts")) {
    addedProducts = JSON.parse(String(localStorage.getItem("addedProducts")));
  }

  if (addedProducts[productID]) {
    addedProducts[productID] = {
      count: addedProducts[productID]['count'] += 1
    }
  } else {
    addedProducts[productID] = {
      count: 1
    }
  }
  localStorage.setItem('addedProducts', JSON.stringify(addedProducts));
}

const handlerClick = (navigate: NavigateFunction) => (productSlug: string) => () => {
  navigate('/product/' + productSlug)
}


type TProps = {
  product: TPropduct
}


export default function ({ product }: TProps) {

  const navigate = useNavigate()

  const onClick = handlerClick(navigate)


  return (
    <Card
      key={product._id}
      style={{ 
        width: '14rem', 
        height: '24rem', 
        margin: '0.5rem', 
        paddingTop: '10px', 
        overflow: 'hidden', 
        position: 'relative'
         }}
         >
      <Image
        onClick={onClick(product.slug)}
        width={'100%'}
        height={150}
        style={{ objectFit: 'contain', cursor: 'pointer' }}
        src={SERVER_URL + product.image} />
      <Card.Body
        style={{ display: 'flex', flexDirection: 'column' }}>
        <Card.Title>
          {product.title}
        </Card.Title>
        <div style={{ marginTop: 'auto', fontSize: '20px' }}>
          {
            (product.discount !== 0) ?
              <div>
                <s
                  style={{ color: '#0004' }}>
                  {product.price}
                </s>
                <div
                  style={{ color: '#C00' }}>
                  {product.price - product.discount} грн
                </div>
              </div>
              :
              <div>
                {product.price} грн
              </div>
          }
        </div>
        <Button
          onClick={handlerAddCartProduct(product._id)}
          variant="primary"
        >ДОБАВИТЬ</Button>
      </Card.Body>
      <div
        style={{ fontSize: '12px', color: '#0004', position: 'absolute', bottom: '0px', alignSelf: 'center' }}>
        {product._id}
      </div>
    </Card>
  )
}