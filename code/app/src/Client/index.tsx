import styled from 'styled-components'
import HeaderContainer from './containers/HeaderContainer'
import CartContainer from './containers/Cart/CartContainer';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import PagesContainer from './containers/MainContainer';


const Wrapper = styled.div` 
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const handlerShowCart = (setIsShowCart: React.Dispatch<React.SetStateAction<boolean>>) => (isShow: boolean) => () => {
  setIsShowCart(isShow)
}

export default function () {

  const location = useLocation().pathname

  const [isShowCart, setIsShowCart] = useState(false)

  useEffect(() => {
    setIsShowCart(false)
  }, [location])


  const onShowCart = handlerShowCart(setIsShowCart)


  return (
    <Provider store={store}>
    <Wrapper>
      {
        location.includes('products') || location === '/' ?
        <HeaderContainer onShowCart={onShowCart}/>
        :
        null
      }
      <PagesContainer />
      {
        isShowCart && <CartContainer onShowCart={onShowCart} />
      }
    </Wrapper>
    </Provider>
  )
}