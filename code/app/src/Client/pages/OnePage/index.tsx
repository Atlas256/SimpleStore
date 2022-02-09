import { Image } from "react-bootstrap"
import { TPropduct } from "../../types"


const SERVER_URL = process.env.REACT_APP_SERVER_URL


type TProps = {
  product: TPropduct | undefined
}


export default function ({ product }: TProps) {


  return (
    <div>
      {
        product &&
        <div style={{display: 'flex', alignItems: 'center', padding: '4rem'}}>
          <Image width={500} height={500} style={{ objectFit: 'contain' }} src={SERVER_URL + product.image} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>{product.title}</div>
            <div>{product.price}</div>
            <div>{product.description}</div>
          </div>
        </div>
      }
    </div>
  )
}