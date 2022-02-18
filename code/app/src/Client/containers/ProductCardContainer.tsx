import { NavigateFunction, useNavigate } from "react-router";
import ProductCard from "../components/ProductCard";
import { TPropduct } from "../types";


type TAddedProduct = {
  count: number
}


const localStorage = window.localStorage;

const handlerClickAdd= (productID: string) => () => {
  let addedProducts: { [key: string]: TAddedProduct } = {}
  if (localStorage.getItem("addedProducts")) {
    addedProducts = JSON.parse(String(localStorage.getItem("addedProducts")));
  }

  if (addedProducts[productID]) {
    addedProducts[productID] = {
      count: addedProducts[productID]['count'] += 1
    }
  } else {
    addedProducts[productID] = {
      count: 1
    }
  }
  localStorage.setItem('addedProducts', JSON.stringify(addedProducts));
}

const handlerClickProduct = (navigate: NavigateFunction) => (productSlug: string) => () => {
  navigate('/product/' + productSlug)
}


type TProps = {
  product: TPropduct
}

export default function ({product}: TProps) {


  const navigate = useNavigate()

  const onClickProduct = handlerClickProduct(navigate)

  return (
    <ProductCard 
    product={product} 
    onClickProduct={onClickProduct}
    onClickAdd={handlerClickAdd}
    />
  )
}