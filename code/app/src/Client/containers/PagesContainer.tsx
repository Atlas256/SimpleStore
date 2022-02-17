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

  const location = useLocation().pathname
  const path = location.replace('products', '').replace(/\//g, '')
  const navigate = useNavigate()


  const { page, text, filters } = useAppSelector(store => store.mainReducer)
  const dispatch = useAppDispatch()


  
  //GET DATA
  useMemo(() => {
    if (path) {
      const parsedData = parserUrl(path)
      dispatch({
        type: "CHANGE_ALL",
        payload: parsedData
      })
    }
  }, [])

  //PUSH DATA
  useMemo(() => {
    let newPath = Object.keys(filters).reduce((acc, typeName) => {
      if (filters[typeName].join('')) {
        acc += typeName + '=' + filters[typeName].join(',') + ';'
      }
      return acc
    }, '')

    if (text) {
      newPath += `text=${text};`;
    }

    if (page !== undefined) {
      newPath += `page=${page};`;
    }

    if (newPath) {
      navigate('/products/' + newPath)
    } else {
      navigate('/products/')
    }
  }, [filters, text, page])


  return (
    <div style={{ overflow: 'hidden', height: '100%' }}>
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