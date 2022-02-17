import { Button, ListGroup } from 'react-bootstrap'
import styled from 'styled-components'
import { TPropduct } from '../../types'


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
  height: 100%;

  background: #FFF;

  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  background: #27F;
  font-weight: bold;
  font-size: 32px;
  color: #FFF;
  padding: 2rem 1rem;
`

const TotalPrice = styled.div`
  font-size: 24px;
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



  return (
    <CartPage>
      <CartBody>
        <Title>
          Cart
        </Title>
        <ListGroup style={{ overflowY: 'scroll' }}>
          {
            cartProducts.map((product) =>
              cartStore[product._id] &&
              <ListGroup.Item key={product._id}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '100px', height: '100px' }}>
                    <img style={{ width: '100%', height: '100%', objectFit: 'contain' }} src={SERVER_URL + product.image} alt="" />
                  </div>
                  <div style={{ marginLeft: '10px' }}>
                    <div>{product.title}</div>
                    {
                      !product.discount
                        ?
                        <div>{product.price} грн</div>
                        :
                        <div>
                          <div style={{ textDecoration: 'line-through' }}>{product.price} грн</div>
                          <div style={{ color: 'red' }}>{product.price - product.discount} грн</div>
                        </div>
                    }
                    <Button
                      variant='warning'
                      onClick={onRemoveItem(product._id)}
                    >REMOVE</Button>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex' }}>
                    <div>
                      <Button
                        style={{ width: '100%' }}
                        onClick={onSubtractCount(String(product._id))}
                      >-</Button>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>{cartStore[product._id]['count']}</div>
                      <Button
                        style={{ width: '100%' }}
                        onClick={onAppendCount(String(product._id))}
                      >+</Button>
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            )
          }
        </ListGroup>
        <div style={{ width: '100%', marginTop: 'auto' }}>
        {
          <TotalPrice>Total price: {totalPrice ? totalPrice : 0} грн</TotalPrice>
        }
          <Button
            style={{ width: '100%' }}
            variant="outline-primary"
            onClick={onClickCheckout}
          >ОФОРМИТЬ ЗАКАЗ</Button>
          <Button
            style={{ width: '100%' }}
            variant="outline-warning"
            onClick={onShowCart(false)}
          >ПРОДОЛЖИТЬ ПОКУПКИ
          </Button>
        </div>
      </CartBody>
    </CartPage>
  )
}