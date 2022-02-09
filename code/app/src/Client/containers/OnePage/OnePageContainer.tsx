import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import OnePage from "../../pages/OnePage";
import { TPropduct } from "../../types";


const SERVER_URL = process.env.REACT_APP_SERVER_URL


const getProduct = async (slug: string) => {
  const { data } = await axios.get(SERVER_URL + `api/products/slug/${slug}`)
  return data
}


export default function() {

  const location = useLocation().pathname
  const slug = location.replace('/product/', '')

  const [product, setProduct] = useState<TPropduct | undefined>()



  useEffect(() => {

    getProduct(slug).then((data) => {
      setProduct(data)
    })
  }, [])




  return(
    <OnePage product={product}/>
  )
}