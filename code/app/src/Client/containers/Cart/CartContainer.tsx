import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router";

import Cart from "../../components/Cart";
import { TPropduct } from "../../types";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const localStorage = window.localStorage




type TCartStore = {
  [key: string]: { count: number }
}

type TCartProduct = {
  [key: string]: string | number
}




async function getPorducts(ids: string[]) {

  const { data } = await axios.get(SERVER_URL + 'api/products/ids', {
    params: {
      ids: ids
    }
  })
  return data
}




const changeCartCount = (setCartStore: React.Dispatch<React.SetStateAction<TCartStore>>, _id: string, number: number) => {
  setCartStore(
    (prev: TCartStore) => {
      let count = prev[_id]['count']
      if ((count + number) >= 1 && (count + number) <= 20) {
        count += number;
      }
      return { ...prev, [_id]: { ['count']: count } }
    }
  )
}

const handlerAppendCount = (setCartStore: React.Dispatch<React.SetStateAction<TCartStore>>) => (_id: string) => () => {
  changeCartCount(setCartStore, _id, 1)
}

const handlerSubtractCount = (setCartStore: React.Dispatch<React.SetStateAction<TCartStore>>) => (_id: string) => () => {
  changeCartCount(setCartStore, _id, -1)
}

const handlerRemoveItem = (setCartStore: React.Dispatch<React.SetStateAction<TCartStore>>) => (_id: string) => () => {
  setCartStore((prev: TCartStore) => {
    delete prev[_id]
    return { ...prev }
  })
}

const handlerClickCheckout = (navigate: NavigateFunction, cartProducts?: TPropduct[]) => () => {
  navigate('/checkout')
}





type TProps = {
  onShowCart: (isShow: boolean) => () => void
}

export default function ({ onShowCart }: TProps) {

  const navigate = useNavigate()

  const [cartStore, setCartStore] = useState<TCartStore>({})
  const [cartProducts, setCartProducts] = useState<TPropduct[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)


  useMemo(() => {
    if (localStorage.getItem("addedProducts")) {
      setCartStore({
        ...JSON.parse(String(localStorage.getItem("addedProducts")))
      })
    }
  }, []);

  useMemo(() => {
    getPorducts(Object.keys(cartStore)).then((data) => {
      setCartProducts([...data])
    })
  }, [cartStore])

  useMemo(() => {
    if (cartProducts.length !== 0) {
      setTotalPrice(cartProducts.reduce((acc, product) => acc + product.price * (cartStore[product._id] && cartStore[product._id]['count']), 0))
    } else {
      setTotalPrice(0)
    }
  }, [cartProducts])

  useMemo(() => {
    if (localStorage.getItem("addedProducts")) {
      localStorage.setItem('addedProducts', JSON.stringify(cartStore))
    }
  }, [cartStore])





  const onAppendCount = handlerAppendCount(setCartStore)
  const onSubtractCount = handlerSubtractCount(setCartStore)
  const onRemoveItem = handlerRemoveItem(setCartStore)
  const onClickCheckout = handlerClickCheckout(navigate)




  return (
    <Cart
      cartStore={cartStore}
      cartProducts={cartProducts}
      totalPrice={totalPrice}
      onShowCart={onShowCart}
      onAppendCount={onAppendCount}
      onSubtractCount={onSubtractCount}
      onRemoveItem={onRemoveItem}
      onClickCheckout={onClickCheckout}
    />
  )
}