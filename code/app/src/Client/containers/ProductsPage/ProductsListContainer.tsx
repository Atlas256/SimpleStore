import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ProductsList from "../../components/ProductsList";
import { TPropduct } from "../../types";
import ButtonsListContainer from "./ButtonsListContainer";



async function getProducts(path: string) {
  const { data } = await axios.get(`http://localhost:5000/api/products/${path}`)
  return data
}


export default function () {

  const location = useLocation().pathname
  const path = location.replace('products', '').replace(/\//g, '')

  const [pagesCount, setPagesCount] = useState<number>(1)
  const [products, setProducts] = useState<TPropduct[]>([])

  useEffect(() => {
    getProducts(path).then((data) => {
      setProducts([...data.products])
      setPagesCount(data.pagesCount)
    })
  }, [location])


  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <ProductsList products={products} />
      <ButtonsListContainer pagesCount={pagesCount} />
    </div>
  )
}


