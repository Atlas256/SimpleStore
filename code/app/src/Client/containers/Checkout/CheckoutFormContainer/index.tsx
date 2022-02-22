import axios from "axios";
import { Navigate, NavigateFunction, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import CheckoutForm from "../../../components/Checkout/CheckoutForm";




const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const handlerClickCheckout = () => () => {
  axios.post(
    SERVER_URL + 'api/payment', {
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 },
      ]
    })
  })
    .then((data) => {
      return data.data
    }).then(({ url }) => {
      window.location = url
    })
}





export default function () {




  const onClickCheckout = handlerClickCheckout()


  return (
    <CheckoutForm onClickCheckout={onClickCheckout} />
  )
}