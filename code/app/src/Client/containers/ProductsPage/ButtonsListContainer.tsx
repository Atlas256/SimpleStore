import { useLocation, useNavigate } from "react-router";
import ButtonsList from "../../components/ButtonsList";




type TProps = {
  pageCount: number
}


export default function({pageCount}: TProps) {

  const location = useLocation().pathname
  const navigate = useNavigate()




  return(
    <ButtonsList pageCount={pageCount} callback={(idx) => console.log(idx)} />
  )
}