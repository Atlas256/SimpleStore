import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import Card from "../components/Card";
import { TCardSection, TItem } from "../types";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;


async function getItems(URL: string) {
  const { data } = await axios.get(URL)
  return data
}

async function getProducts() {
  const products = await getItems(SERVER_URL + 'api/products')
  const tags = await getItems(SERVER_URL + 'api/tags')


  for (let idx = 0; idx < products.length; idx++) {
    
    products[idx]['tags'] = tags.filter((tag: TItem) => products[idx]['tagsID'].includes(tag._id) )
    
    
  }

  console.log(products);

  return products
}





type TProps = {
  CARD_SECTION: TCardSection[]
}



export default function ({ CARD_SECTION }: TProps) {

  const [items, setItems] = useState<TItem[]>([])


  useEffect(() => {
    getProducts().then((data) => {
      setItems(data)
    })
  }, [])



  return (
    <div style={{ width: '100%', overflowY: 'scroll', border: '1px solid red' }}>
      {
        items && items.map((item: TItem) =>
          <Card item={item} CARD_SECTION={CARD_SECTION} />
        )
      }
    </div>
  )
}