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
  grid-template-columns: 20% 65% 15%;
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
  font-size: 18px;
  color: #0008;
  display: flex;
  padding: 0rem 1rem;
  overflow-y: hidden;
`

const Price = styled.div`
  font-weight: 400;
  font-size: 18px;
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
  border: 1px solid #0001;
  font-weight: 100;
  font-size: 16px;
  letter-spacing: 2px;
  color: #0008;
  transition: 0.25s;
  :hover {
    border: 1px solid #0000;
    color: #0004;
    text-decoration: none;
  }
`

const CounterContainer = styled.div`
  min-height: 2rem;
  border: 1px solid #0001;
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

const OldPrice = styled.div` 
  color: #0002;
  text-decoration: line-through;
  font-weight: 100;
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
          {
            product.discount ?
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>{formatter.format(cartStore[product._id]['count'] * (product.price - product.discount))}</div>
                <OldPrice>{formatter.format(cartStore[product._id]['count'] * product.price)}</OldPrice>
              </div>
              :
              <div>{formatter.format(cartStore[product._id]['count'] * product.price)}</div>
          }
        </Price>
      </Grid>
      <Buttons>
        <ButtonRemove onClick={onRemoveItem(product._id)}>REMOVE</ButtonRemove>
        <CounterContainer>
          <CounterButton 
          style={{color: cartStore[product._id]['count'] === 1 ? '#0002' : '#000' }}
          onClick={onSubtractCount(product._id)}>-</CounterButton>
          <CounterInput>
            {cartStore[product._id]['count']}
          </CounterInput>
          <CounterButton onClick={onAppendCount(product._id)}>+</CounterButton>
        </CounterContainer>
      </Buttons>
    </ItemBody>
  )
}