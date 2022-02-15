import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { TPropduct } from "../../Client/types"
import Card from "../components/Card";
import { TCardSection, TItem } from "../types";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;


async function getItems() {
  const { data } = await axios.get(SERVER_URL + 'api/products')
  return data
}



type TProps = {
  CARD_SECTION: TCardSection[]
}



export default function ({CARD_SECTION}: TProps) {

  const [items, setItems] = useState<TItem[]>([])


  useEffect(() => {
    getItems().then((data) => {
      setItems(data)
    })
  }, [])



  return (
    <div style={{overflowY: 'scroll'}}>
      {
        items && items.map((item: TItem) =>
          <Card item={item} CARD_SECTION={CARD_SECTION}/>
        )
      }
    </div>
  )
}