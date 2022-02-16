import { useMemo } from "react"
import { Button } from "react-bootstrap"




const createButtonList = (pageCount: number, callback: (idx: number) => void) =>
  Array(pageCount).fill('').map((_, idx) =>
    <Button
      variant="outline-success"
      key={`./page=${(idx + 1)}`}
      onClick={() => callback(idx+1)}>
      {idx + 1}
    </Button>
  )



type TProps = {
  pageCount: number
  callback: (idx: number) => void
}


export default function({pageCount, callback}: TProps) {




  const buttonList = useMemo(() =>
    createButtonList(pageCount, callback)
    , [pageCount])


  return(
    <div>
      {
      buttonList
      }
    </div>
  )
}