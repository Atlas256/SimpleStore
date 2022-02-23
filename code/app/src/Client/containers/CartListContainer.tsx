import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Dispatch } from "redux";
import CartList from "../components/CartList";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { TAction } from "../store/reducers/mainReducer";
import { TProduct } from "../types";



const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const localStorage = window.localStorage




type TCartStore = {
  [key: string]: { count: number }
}



async function getPorducts(ids: string[]) {

  const { data } = await axios.get(SERVER_URL + 'api/products/ids', {
    params: {
      ids: ids
    }
  })
  return data
}


const changeCartCount = (cartStore: TCartStore, dispatch: Dispatch<TAction>, _id: string, number: number) => {

  let count = cartStore[_id]['count']
  if ((count + number) >= 1 && (count + number) <= 20) {
    count += number;
  }

  dispatch({
    type: "CHANGE_CART_STORE",
    payload: { ...cartStore, [_id]: { ['count']: count } }
  })
}

const handlerAppendCount = (cartStore: TCartStore, dispatch: Dispatch<TAction>) => (_id: string) => () => {
  changeCartCount(cartStore, dispatch, _id, 1)
}

const handlerSubtractCount = (cartStore: TCartStore, dispatch: Dispatch<TAction>) => (_id: string) => () => {
  changeCartCount(cartStore, dispatch, _id, -1)
}

const handlerRemoveItem = (cartStore: TCartStore, dispatch: Dispatch<TAction>) => (_id: string) => () => {

  delete cartStore[_id]

  dispatch({
    type: "CHANGE_CART_STORE",
    payload: { ...cartStore }
  })
}




type TProps = {
  isActive: boolean
}


export default function ({ isActive }: TProps) {


  const { cartStore, cartProducts } = useAppSelector(store => store.cartReducer)
  const dispatch = useAppDispatch()


  useEffect(() => {
    if (localStorage.getItem("addedProducts")) {
      dispatch({
        type: "CHANGE_CART_STORE",
        payload: JSON.parse(String(localStorage.getItem("addedProducts")))
      })
    }
  }, []);

  useEffect(() => {
      getPorducts(Object.keys(cartStore)).then((data) => {
        dispatch({
          type: "CHANGE_CART_PRODUCTS",
          payload: [...data]
        })
      })
  }, [cartStore])


  useEffect(() => {
    if (cartProducts.length !== 0) {
      dispatch({
        type: "CHANGE_TOTAL_PRICE",
        payload: cartProducts.reduce((acc: number, product: TProduct) =>
          acc + product.price * (cartStore[product._id] && cartStore[product._id]['count']), 0)
      })
    } else {
      dispatch({
        type: "CHANGE_TOTAL_PRICE",
        payload: 0
      })
    }
  }, [cartProducts])

  useEffect(() => {
    if (localStorage.getItem("addedProducts") && cartProducts.length) {
      localStorage.setItem('addedProducts', JSON.stringify(cartStore))
    }
  }, [cartStore])


  const onAppendCount = handlerAppendCount(cartStore, dispatch)
  const onSubtractCount = handlerSubtractCount(cartStore, dispatch)
  const onRemoveItem = handlerRemoveItem(cartStore, dispatch)



  return (
    <CartList
      cartStore={cartStore}
      cartProducts={cartProducts}
      onAppendCount={onAppendCount}
      onSubtractCount={onSubtractCount}
      onRemoveItem={onRemoveItem}
      isActive={isActive}
    />
  )
}