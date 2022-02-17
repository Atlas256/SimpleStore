import { useEffect, useMemo } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import parserUrl from "../../Helpers/parserUrl"
import CheckoutPage from "../pages/CheckoutPage"
import MainPage from "../pages/MainPage"
import ProductsPage from "../pages/ProductsPage"
import SearchPage from "../pages/SearchPage"
import OnePageContainer from "./OnePage/OnePageContainer"



export default function () {

  const location = useLocation().pathname
  const path = location.replace('products', '').replace(/\//g, '')
  const navigate = useNavigate()


  const mainReducer = useAppSelector(store => store.mainReducer)
  const { text, page, filters } = mainReducer;
  const dispatch = useAppDispatch()

  //GET DATA
  useEffect(() => {
    if (path) {
      const parsedData = parserUrl(decodeURI(path))

      if (!parsedData.filters) {
        parsedData['filters'] = {}
      }
      dispatch({
        type: "CHANGE_ALL",
        payload: parsedData
      })
    }
  }, [path])


  //PUSH DATA
  useEffect(() => {
    let newPath = ''
    newPath += text ? `text=${text};` : '';
    newPath += page ? `page=${page};` : '';
    newPath += filters ? Object.keys(filters).reduce((acc, typeName) => {
      if (filters[typeName].join('').length) {
        acc += typeName + '=' + filters[typeName].join(',') + ';'
      }
      return acc
    }, '') : ''

    if (JSON.stringify(mainReducer) !== JSON.stringify({})) {
      navigate(`/products/${newPath}`)
    } else {
      navigate('/')
    }
  }, [mainReducer])


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