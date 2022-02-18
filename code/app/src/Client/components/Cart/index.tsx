import { Button, ListGroup } from 'react-bootstrap'
import styled from 'styled-components'
import { TPropduct } from '../../types'
import CartItem from './CartItem'


const SERVER_URL = process.env.REACT_APP_SERVER_URL


const CartPage = styled.div`
  width: 100%;
  height: 100%;

  background: #0002;

  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  z-index: 10000;

  justify-content: right;
`

const CartBody = styled.div`
  max-width: 500px;
  min-width: 500px;
  height: 100vh;

  background: #FFF;

  display: flex;
  flex-direction: column;
`

const CartHeader = styled.div`
  min-height: 80px;

  background: #27E;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1rem;
`

const CartTitle = styled.button` 
  background: #0000;
  font-weight: 200;
  font-size: 36px;
  letter-spacing: 2.0px;
  line-height: 36px;
  color: #FFF;
`

const ButtonClose = styled.button`
  background: #0000;
  font-size: 22px;
  line-height: 22px;
  color: #FFF;
  padding: 0.5rem;
`

const ButtonCheckout = styled(Button)` 
  width: 100%;
  border: 1px solid #0001;
  font-weight: 100;
  font-size: 24px;
`

const CartFotter = styled.div`
  min-height: 150px;

  box-shadow: 0px -1px 6px #0001;

  font-weight: 500;
  font-size: 32px;
  color: #444;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 1rem;
`

const TotalPrice = styled.div`
  font-weight: 300;
  font-size: 24px;

  display: flex;
  justify-content: space-between;
`

const CartList = styled.div`
  height: 80%;
  overflow-y: scroll;
`









type TProps = {
  cartStore: { [key: string]: any }
  cartProducts: TPropduct[]
  totalPrice: number
  onShowCart: (isShow: boolean) => () => void
  onAppendCount: (_id: string) => () => void
  onSubtractCount: (_id: string) => () => void
  onRemoveItem: (_id: string) => () => void
  onClickCheckout: () => void
}

export default function ({
  cartStore,
  cartProducts,
  totalPrice,
  onShowCart,
  onAppendCount,
  onSubtractCount,
  onRemoveItem,
  onClickCheckout
}: TProps) {


  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });



  return (
    <CartPage>
      <CartBody>

        <CartHeader>
          <CartTitle>
            Cart
          </CartTitle>
          <ButtonClose onClick={onShowCart(false)}>
            ✕
          </ButtonClose>
        </CartHeader>

        <CartList>
          {
            cartProducts.map((product) =>
            cartStore[product._id] &&
              <CartItem
                key={product._id}
                cartStore={cartStore}
                product={product}
                onAppendCount={onAppendCount}
                onSubtractCount={onSubtractCount}
                onRemoveItem={onRemoveItem}
              />
            )
          }
        </CartList>
        <CartFotter>
          <TotalPrice>
            <div>Total price:</div>
            <div>{formatter.format(totalPrice ? totalPrice : 0)}</div>
          </TotalPrice>
          <ButtonCheckout
            variant="outline-primary"
            onClick={onClickCheckout}
          >
            Go to checkout
          </ButtonCheckout>
        </CartFotter>
      </CartBody>
    </CartPage>
  )
}