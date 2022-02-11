import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ProductsList from "../../components/ProductsList";
import { TPropduct } from "../../types";



async function getProducts(path: string) {
  const { data } = await axios.get(`http://localhost:5000/api/products/${path}`)
  return data
}


export default function () {

  const location = useLocation().pathname
  const path = location.replace('products', '').replace(/\//g, '')

  const [products, setProducts] = useState<TPropduct[]>([])

  useEffect(() => {
    getProducts(path).then((products) => setProducts([...products]))
  }, [location])


  return (
    <ProductsList products={products} />
  )
}


