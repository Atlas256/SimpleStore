import axios from "axios";
import { Navigate, NavigateFunction, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import CheckoutForm, { TInputFields } from "../../../components/Checkout/CheckoutForm";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { TAction } from "../../../store/reducers/mainReducer";
import { Dispatch } from "redux";
import { TProduct } from "../../../types";




const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const handlerClickCheckout = (dispatch: Dispatch<TAction>, cartProducts: TProduct[]) => (inputFields: TInputFields) => () => {

  console.log(cartProducts);
  
  dispatch({
    type: "CHANGE_CHECKOUT_DATA", payload: Object.keys(inputFields).reduce((acc: any, key: string) => {
      acc[key] = inputFields[key]['value']
      return acc
    }, {})
  })


  axios.post(
    SERVER_URL + 'api/payment', {
    items: cartProducts
  })
    .then((data) => {
      return data.data
    }).then(({ url }) => {
      window.location = url
    })
}





export default function () {

  const dispatch = useAppDispatch()
  const { cartProducts } = useAppSelector(store => store.cartReducer)



  const onClickCheckout = handlerClickCheckout(dispatch, cartProducts)


  return (
    <CheckoutForm onClickCheckout={onClickCheckout} />
  )
}