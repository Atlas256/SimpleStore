import { useMemo } from "react"
import { Button } from "react-bootstrap"




const createButtonList = (pagesCount: number, currentPage: number, onClick: TProps['onClick']) =>
  Array(pagesCount).fill('').map((_, idx) =>
    <Button
      variant="outline-success"
      key={`./page=${(idx + 1)}`}
      onClick={onClick(idx + 1)}>
      {idx + 1}
    </Button>
  )



type TProps = {
  pagesCount: number
  currentPage: number
  onClick: (number: number) => () => void
}


export default function ({ pagesCount, currentPage, onClick }: TProps) {


  const buttonList = useMemo(() =>
    createButtonList(pagesCount, currentPage, onClick)
    , [pagesCount])


  return (
    <div>
      {
        buttonList
      }
    </div>
  )
}