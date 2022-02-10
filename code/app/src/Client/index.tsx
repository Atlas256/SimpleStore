import styled from 'styled-components'
import HeaderContainer from './containers/HeaderContainer'
import { Route, Routes } from "react-router-dom";
import ProductsPage from './pages/ProductsPage';
import MainPage from './pages/MainPage';
import CartContainer from './containers/Cart/CartContainer';
import { useEffect, useState } from 'react';
import CheckoutPage from './pages/CheckoutPage';
import { useLocation } from 'react-router';
import OnePageContainer from './containers/OnePage/OnePageContainer';


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
    <Wrapper>
      <HeaderContainer onShowCart={onShowCart}/>
      <div style={{overflow: 'hidden', height: '100%'}}>
        <Routes>
          <Route path="" element={<MainPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/products/*" element={<ProductsPage />} />
          <Route path="/product/*" element={<OnePageContainer />} />
        </Routes>
      </div>
      {
        isShowCart && <CartContainer onShowCart={onShowCart} />
      }
    </Wrapper>
  )
}