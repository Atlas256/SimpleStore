import styled from 'styled-components'

import ProductCardContainer from "../../containers/ProductCardContainer";
import { TPropduct } from "../../types"



const ListBody = styled.div`
  width: 100%;
  height: 100%;
  display: grid;

  overflow-y: scroll;
  overflow-x: hidden;

  @media screen and (min-width: 300px) {
    grid-template-columns: repeat(1, 100%);
  }

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 50%);
  }

  @media screen and (min-width: 800px) {
    grid-template-columns: repeat(3, 33%);
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 25%);
  }
  
  @media screen and (min-width: 1400px) {
    grid-template-columns: repeat(5, 20%);
  }
`



type TProps = {
  products: TPropduct[]
}


export default function ({ products }: TProps) {



  return (
    <ListBody>
      {
        products.map((product: TPropduct) =>
          <ProductCardContainer key={product._id} product={product} />
        )
      }
    </ListBody>
  )
}

