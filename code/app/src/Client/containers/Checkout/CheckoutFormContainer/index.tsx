import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router";
import CheckoutFrom from "../../../components/Checkout/CheckoutFrom";



const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const handlerClickCheckout = (navigate: NavigateFunction) => () => {
  axios.post(
    SERVER_URL+'api/create-checkout-session', {
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 },
      ]
    })
  })
    .then((res: any) => {
      if (res.ok) {
        return res.json()
      }
      return res.json().then((json: any) => Promise.reject(json))
    })
    .then(({ url }) => {
      navigate(url)
    })

}


export default function () {

  const navigate = useNavigate()


  const onClickCheckout = handlerClickCheckout(navigate)



  return (
    <CheckoutFrom onClickCheckout={onClickCheckout} />
  )
}