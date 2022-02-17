import { useEffect, useState } from "react";
import ButtonsList from "../../components/ButtonsList";




const handlerOnClick = (setCurrentPage: React.Dispatch<React.SetStateAction<number>>) => (number: number) => () => {
  setCurrentPage(number)
}


type TProps = {
  pagesCount: number
}


export default function({pagesCount}: TProps) {

  const [currentPage, setCurrentPage] = useState<number>(0)

  const onClick = handlerOnClick(setCurrentPage)


  useEffect(() => {
    console.log(currentPage);
  }, [currentPage])


  return(
    <ButtonsList 
    pagesCount={pagesCount} 
    currentPage={currentPage} 
    setCurrentPage={setCurrentPage} 
    onClick={onClick}
    />
  )
}