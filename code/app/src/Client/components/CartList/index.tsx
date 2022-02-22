import styled from 'styled-components'
import { TProduct } from '../../types'
import CartItem from './CartItem'





const CartList = styled.div`
  height: 80%;
  overflow-y: scroll;
`


type TProps = {
  cartProducts: TProduct[]
  cartStore: { [key: string]: any }
  onAppendCount: (_id: string) => () => void
  onSubtractCount: (_id: string) => () => void
  onRemoveItem: (_id: string) => () => void
  isActive: boolean
}

export default function ({
  cartProducts,
  cartStore,
  onAppendCount,
  onSubtractCount,
  onRemoveItem,
  isActive 
}: TProps) {


  return (
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
            isActive={isActive}
          />
        )
      }
    </CartList>
  )
}