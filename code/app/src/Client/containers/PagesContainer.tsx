import { useMemo } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router"
import parserUrl from "../../Helpers/parserUrl"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import CheckoutPage from "../pages/CheckoutPage"
import MainPage from "../pages/MainPage"
import ProductsPage from "../pages/ProductsPage"
import SearchPage from "../pages/SearchPage"
import OnePageContainer from "./OnePage/OnePageContainer"



export default function () {

  const location = decodeURI(useLocation().pathname)
  const path = location.replace('products', '').replace(/\//g, '')

  const navigate = useNavigate()


  const filters = useAppSelector(store => store.filtersReducer)
  const mainReducer = useAppSelector(store => store.mainReducer)
  const dispatch = useAppDispatch()

  useMemo(() => {
    dispatch({type: "CHANGE_PAGE", payload: parserUrl(path).page})
  }, [])


  useMemo(() => {
    let newPath = Object.keys(filters).reduce((acc, typeName) => {
        if (filters[typeName].join('')) {
            acc += typeName + '=' + filters[typeName].join(',') + ';'
        }
        return acc
    }, '')

    if (mainReducer.text) {
      newPath += `text=${mainReducer.text};`;
    }

    if (mainReducer.page) {
      newPath += `page=${mainReducer.page}`;
    }

    if (newPath) {
        navigate('/products/' + newPath)
    } else {
        navigate('/products/')
    }
}, [filters, mainReducer])


  return (
      <div style={{overflow: 'hidden', height: '100%'}}>
        <Routes>
          <Route path="" element={<MainPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/products/*" element={<ProductsPage />} />
          <Route path="/product/*" element={<OnePageContainer />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>

  )
}