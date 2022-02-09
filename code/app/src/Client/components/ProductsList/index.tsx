import { TPropduct } from "../../types"
import ProductCard from "../ProductCard";





type TProps = {
  products: TPropduct[]
}


export default function ({ products }: TProps) {



  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap', overflowY: 'scroll', padding: '3rem' }}>
      {
        products.map((product: TPropduct) =>
          <ProductCard key={product._id} product={product} />
        )
      }
    </div>
  )
}

