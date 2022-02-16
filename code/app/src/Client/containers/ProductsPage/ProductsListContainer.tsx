import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import PageButtons from "../../components/ButtonsList";
import ProductsList from "../../components/ProductsList";
import { TPropduct } from "../../types";
import ButtonsListContainer from "./ButtonsListContainer";



async function getProducts(path: string) {
  const { data } = await axios.get(`http://localhost:5000/api/products/${path}`)
  console.log(data);
  
  return data
}


export default function () {

  const location = useLocation().pathname
  const path = location.replace('products', '').replace(/\//g, '')

  const [pageCount, setPageCount] = useState<number>(10)
  const [products, setProducts] = useState<TPropduct[]>([])

  useEffect(() => {
    getProducts(path).then((data) => {
      setProducts([...data.products])
    })
  }, [location])


  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <ProductsList products={products} />
      <ButtonsListContainer pageCount={pageCount} />
    </div>
  )
}


