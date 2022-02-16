import { useMemo } from "react"
import { useNavigate } from "react-router"
import { useAppSelector } from "../../hooks/redux"
import ProductsListContainer from "./ProductsListContainer"
import SidebarContainer from "./SidebarContainer"





export default function () {

  const navigate = useNavigate()


  const mainReducer = useAppSelector(store => store.mainReducer)

  useMemo(() => {
    console.log(123);
    
    if (mainReducer.text) {
      navigate(`./text=${mainReducer.text}`)
    } else {
      navigate('/products/')
    }
  }, [mainReducer.text])


  return (
    <>
      <SidebarContainer />
      <ProductsListContainer />
    </>
  )
}