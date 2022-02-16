import { useMemo } from "react"
import { Button } from "react-bootstrap"




const createButtonList = (pagesCount: number, onClick: TProps['onClick']) =>
  Array(pagesCount).fill('').map((_, idx) =>
    <Button
      variant="outline-success"
      key={`./page=${(idx + 1)}`}
      onClick={onClick(idx+1)}>
      {idx + 1}
    </Button>
  )



type TProps = {
  pagesCount: number
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  onClick: (number: number) => () => void
}


export default function({pagesCount, currentPage, setCurrentPage, onClick}: TProps) {




  const buttonList = useMemo(() =>
    createButtonList(pagesCount, onClick)
    , [pagesCount])


  return(
    <div>
      {
      buttonList
      }
    </div>
  )
}