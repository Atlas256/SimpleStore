import axios from "axios";
import { useEffect, useState } from "react";

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




const changeCartCount = (setCartStore: React.Dispatch<React.SetStateAction<TCartStore>>, _id: string, number: number) => {
  if (localStorage.getItem("addedProducts")) {
    setCartStore(
      (prev: TCartStore) => {
        let count = prev[_id]['count']

        if ((count + number) >= 1 && (count + number) <= 9) {
          count += number;
        }

        const newState = { ...prev, [_id]: { ['count']: count } }
        localStorage.setItem('addedProducts', JSON.stringify(newState))
        return newState
      }
    )
  }
}

const handlerAppendCount = (setCartStore: React.Dispatch<React.SetStateAction<TCartStore>>) => (_id: string) => () => {
  changeCartCount(setCartStore, _id, 1)
}

const handlerSubtractCount = (setCartStore: React.Dispatch<React.SetStateAction<TCartStore>>) => (_id: string) => () => {
  changeCartCount(setCartStore, _id, -1)
}





type TProps = {
  onShowCart: (isShow: boolean) => () => void
}

export default function ({ onShowCart }: TProps) {

  const [cartStore, setCartStore] = useState<TCartStore>({})
  const [cartProducts, setCartProducts] = useState<TPropduct[]>([])


  useEffect(() => {
    if (localStorage.getItem("addedProducts")) {
      setCartStore({
        ...JSON.parse(String(localStorage.getItem("addedProducts")))
      })
    }
  }, []);

  useEffect(() => {
    //console.log(cartStore);

    if (cartStore) {
      axios.get(SERVER_URL + 'api/products', {
        params: {
          ids: Object.keys(cartStore)
        }
      }).then((data) => {
        setCartProducts(data.data)
      })
    }
  }, [cartStore])



  const onAppendCount = handlerAppendCount(setCartStore)
  const onSubtractCount = handlerSubtractCount(setCartStore)



  return (
    <Cart
      cartStore={cartStore}
      cartProducts={cartProducts}
      onShowCart={onShowCart}
      onAppendCount={onAppendCount}
      onSubtractCount={onSubtractCount}
    />
  )
}