import styled from 'styled-components'

import ProductCardContainer from "../../containers/ProductCardContainer";
import { TProduct } from "../../types"



const ListBody = styled.div`
  width: 100%;
  height: 100%;
  display: grid;

  overflow-y: scroll;
  overflow-x: hidden;

  @media screen and (min-width: 300px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 2fr);
  }

  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(3, 3fr);
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(4, 4fr);
  }
  
  @media screen and (min-width: 1400px) {
    grid-template-columns: repeat(5, 5fr);
  }
`



type TProps = {
  products: TProduct[]
}


export default function ({ products }: TProps) {



  return (
    <ListBody>
      {
        products.map((product: TProduct) =>
          <ProductCardContainer key={product._id} product={product} />
        )
      }
    </ListBody>
  )
}

