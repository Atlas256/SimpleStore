import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { TPropduct } from '../../../types';


const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const ItemBody = styled.div`
  height: 180px;
  border-bottom: 1px solid #0001;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`

const Grid = styled.div`
  width: 100%;
  height: 80%;

  display: grid;
  grid-template-columns: 20% 50% 30%;
`

const ImageContainer = styled.div` 
  width: 100%;
  height: inherit;
`

const Image = styled.img` 
  width: 100%;
  height: 100%;

  object-fit: contain;
  object-position: center;
`

const Title = styled.div` 
  width: 100%;
  font-weight: 100;
  font-size: 20px;
  color: #0008;
  display: flex;
  padding: 0rem 1rem;
  overflow-y: hidden;
`

const Price = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #222;
  display: flex;
  justify-content: right;
`

const Buttons = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-self: flex-end;
`

const ButtonRemove = styled.button` 
  background: #0000;
  font-size: 16px;
  color: #0004;
  text-decoration: underline;
  :hover {
    color: #0008;
    text-decoration: none;
  }
`

const CounterContainer = styled.div`
  border: 1px solid #0002;
  border-radius: 100rem;
  display: flex;
`

const CounterButton = styled.button` 
  background: #0000;
  min-width: 2rem;
  max-width: 2rem;
`

const CounterInput = styled.div`
  min-width: 2rem;
  max-width: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`


type TProps = {
  cartStore: { [key: string]: any }
  product: TPropduct
  onAppendCount: (_id: string) => () => void
  onSubtractCount: (_id: string) => () => void
  onRemoveItem: (_id: string) => () => void
}


export default function ({ cartStore, product, onRemoveItem, onSubtractCount, onAppendCount }: TProps) {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });


  return (
    <ItemBody>
      <Grid>
        <ImageContainer>
          <Image src={SERVER_URL + product.image} alt="" />
        </ImageContainer>
        <Title>
          {product.title}
        </Title>
        <Price>
          {formatter.format(product.price)}
        </Price>
      </Grid>
      <Buttons>
        <ButtonRemove onClick={onRemoveItem(product._id)}>REMOVE</ButtonRemove>
        <CounterContainer>
          <CounterButton onClick={onSubtractCount(product._id)}>-</CounterButton>
          <CounterInput>
            {cartStore[product._id]['count']}
          </CounterInput>
          <CounterButton onClick={onAppendCount(product._id)}>+</CounterButton>
        </CounterContainer>
      </Buttons>
    </ItemBody>
  )
}