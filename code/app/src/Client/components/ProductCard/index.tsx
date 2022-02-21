import styled from 'styled-components'
import { Card, Button } from "react-bootstrap";
import { TPropduct } from '../../types';


const SERVER_URL = process.env.REACT_APP_SERVER_URL;





const CardBody = styled.div`
  width: 100%;
  height: 100%;
  max-height: 500px;

  border: 1px solid #0001;

  padding: 1rem;

  display: grid;
  grid-template-rows: 40% 40% 20%;
`

const ImageContainer = styled.div` 
  width: 100%;
`

const Image = styled.img`
  width: 100%;
  height: 100%;

  object-fit: contain;
  object-position: center;

  cursor: pointer;
`

const Title = styled.div` 
  font-weight: 200;
  font-size: 20px;
  color: #222;
`

const CartFotter = styled.div` 
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const ButtonCart = styled.button` 
  background: #0000;
  font-weight: 100;
  font-size: 24px;
  color: #27F;

  transition: 0.25s;

  :hover {
    color: #F906
  }

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
      <ImageContainer
        onClick={onClickProduct(product.slug)}
        >
        <Image src={SERVER_URL + product.image} />
      </ImageContainer>

      <Title>
        {product.title}
      </Title>

      <CartFotter>

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
        <ButtonCart
          onClick={onClickAdd(product._id)}
        >
          ADD
        </ButtonCart>
      </CartFotter>


    </CardBody>
  )
}