import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";

import Cart from "../../components/ModalCart";
import { useAppSelector } from "../../hooks/redux";
import { TProduct } from "../../types";





const handlerClickCheckout = (navigate: NavigateFunction, cartProducts?: TProduct[]) => () => {
  navigate('/checkout')
}





type TProps = {
  onShowCart: (isShow: boolean) => () => void
}

export default function ({ onShowCart }: TProps) {

  const navigate = useNavigate()

  const { totalPrice } = useAppSelector(store => store.cartReducer)


  const onClickCheckout = handlerClickCheckout(navigate)




  return (
    <Cart
      totalPrice={totalPrice}
      onShowCart={onShowCart}
      onClickCheckout={onClickCheckout}
    />
  )
}