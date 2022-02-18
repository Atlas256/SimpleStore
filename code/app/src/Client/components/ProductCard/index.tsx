import styled from 'styled-components'
import { Card, Button } from "react-bootstrap";
import { TPropduct } from '../../types';


const SERVER_URL = process.env.REACT_APP_SERVER_URL;





const CardBody = styled.div`
  width: 200px;
  height: 350px;

  box-shadow: 0px 0px 6px #0001;

  margin: 1rem;
  padding: 1rem;

  display: grid;
  grid-template-rows: 40% 40% 10% 10%;
`

const ImageContainer = styled.div` 
  width: 100%;
`

const Image = styled.img`
  width: 100%;
  height: 100%;

  object-fit: contain;
  object-position: center;
`

const Title = styled.div` 
  font-weight: 200;
  font-size: 20px;
  color: #222;
`

const Price = styled.div`
  font-weight: 400;
  font-size: 18px;
  color: #222;
  display: flex;
  justify-content: right;
`

const OldPrice = styled.div` 
  color: #0002;
  text-decoration: line-through;
  font-weight: 100;
`


type TProps = {
  product: TPropduct
  onClickProduct: (productSlug: string) => () => void
  onClickAdd: (productID: string) => () => void
}

export default function ({ product, onClickProduct, onClickAdd }: TProps) {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });


  return (
    <CardBody>
      <ImageContainer>
        <Image src={SERVER_URL + product.image} />
      </ImageContainer>
      <Title>
        {product.title}
      </Title>
      <Price>
        {
          product.discount ?
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>{formatter.format(product.price - product.discount)}</div>
              <OldPrice>{formatter.format(product.price)}</OldPrice>
            </div>
            :
            <div>{formatter.format(product.price)}</div>
        }
      </Price>

    </CardBody>
  )
}