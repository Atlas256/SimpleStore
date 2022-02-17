import { useMemo } from "react"
import { useNavigate } from "react-router"
import { useAppSelector } from "../../hooks/redux"
import ProductsListContainer from "./ProductsListContainer"
import SidebarContainer from "./SidebarContainer"





export default function () {

  const navigate = useNavigate()


  const filters = useAppSelector(store => store.filtersReducer)
  const mainReducer = useAppSelector(store => store.mainReducer)


  useMemo(() => {
    let newPath = Object.keys(filters).reduce((acc, typeName) => {
        if (filters[typeName].join('')) {
            acc += typeName + '=' + filters[typeName].join(',') + ';'
        }
        return acc
    }, '')

    if (mainReducer.text) {
      newPath += `text=${mainReducer.text}`;
    }

    if (newPath) {
        navigate('./' + newPath)
    } else {
        navigate('/products/')
    }
}, [filters, mainReducer])


  return (
    <>
      <SidebarContainer />
      <ProductsListContainer />
    </>
  )
}