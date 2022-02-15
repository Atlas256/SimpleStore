import { Button, ListGroup } from 'react-bootstrap'
import { NavigateFunction, useNavigate } from 'react-router'
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
  padding: 4rem;
`

const CartBody = styled.div`
  width: 100%;
  height: 100%;

  background: #FFF;
  border-radius: 10px;
  padding: 1rem;

  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 32px;
`

const TotalPrice = styled.div`
  font-size: 20px;
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
          КОРЗИНА
        </Title>
        {
          <TotalPrice>Total price: {totalPrice} грн</TotalPrice>
        }
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