import axios from "axios";
import { Navigate, NavigateFunction, useNavigate } from "react-router";
import { Elements } from '@stripe/react-stripe-js';

import UserDataFrom from "../../../components/Checkout/UserDataFrom";
import CheckoutForm from "../../../components/Checkout/CheckoutForm";
import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";





//const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLICK_KEY!);



const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const handlerClickCheckout = (navigate: NavigateFunction) => () => {
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
    }).then(({url}) => {
      window.location = url
    })
}








export default function () {

  const navigate = useNavigate()

  const onClickCheckout = handlerClickCheckout(navigate)

  const [options, setOptions] = useState({
    clientSecret: '',
    appearance: {/*...*/ }
  })



  useEffect(() => {
    axios.get(SERVER_URL + 'api/secret').then((data) => {
      console.log(data.data);
      setOptions({ ...options, ['clientSecret']: data.data })
    })
  }, [])


  return (
    <>
      <div></div>


        <UserDataFrom onClickCheckout={onClickCheckout} />



    </>
  )
}