import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ProductsList from "../../components/ProductsList";
import { TPropduct } from "../../types";



async function getProducts(locationPath: string) {
  const { data } = await axios.get(`http://localhost:5000/api/products/${locationPath}`)
  return data
}


export default function () {

  const location = useLocation().pathname;

  const [products, setProducts] = useState<TPropduct[]>([])

  useEffect(() => {
    getProducts(location).then((products) => setProducts([...products]))
  }, [location])


  return (
    <ProductsList products={products} />
  )
}


