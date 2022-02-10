/*import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import parserUrl from "../../../Helpers/parserUrl";
import Sidebar from "../../components/Sidebar";
import { TCategoryData, TSidebarData } from "../../types";



// ?
async function getCategories() {
  const { data } = await axios.get('http://localhost:5000/api/sidebar')
  return data
}

// ?
const handlerClickCategory = (navigate: NavigateFunction) => (slug: string) => {
  navigate(`./category=${slug}/`)
}

// ?
async function getSidebarData(category: string) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const { data } = await axios.get(SERVER_URL + `api/sidebar/category=${category}/`)
  return data
}

// ?
export type TFilterItem = {
  [key: string]: string[]
}



export default function () {

  // todo
  const location = useLocation().pathname
  const navigate = useNavigate()


  //const [categories, setCategories] = useState<TCategoryData[]>([])

  //const onClickCategory = handlerClickCategory(navigate)

  const [sidebarData, setSidebarData] = useState<TSidebarData[]>([])

  //const [category, setCategory] = useState<string>('')
  //const [filters, setFilters] = useState<TFilterItem>({ color: [], producer: [] })


  useEffect(() => {
    getCategories().then((categories) => setCategories([...categories]))
  }, [])

  /*
  useEffect(() => {
    const parsedData = parserUrl(location)
    setCategory(parsedData['category'])
    setFilters({ ...parsedData['filters'] })
  }, [location])

  useEffect(() => {
    if (category) {
      getSidebarData(category).then((sidebarData) => setSidebarData(sidebarData))
    }
  }, [category])



  useEffect(() => {
    if (filters) {
      const newPath = Object.keys(filters).reduce((acc, typeName) => {
        if (filters[typeName].join('')) {
          acc += typeName + '=' + filters[typeName].join(',') + ';'
        }
        return acc
      }, '')
      if (category) {
        navigate(`category=${category}/` + newPath)
      }
    }
  }, [filters])



  const onClickCheckbox = (e: React.ChangeEvent<HTMLInputElement>, typeSlug: string, tagSlug: string) => {

    if (e.target.checked) {
      if (filters[typeSlug]) {
        setFilters({ ...filters, [typeSlug]: [...filters[typeSlug], tagSlug] })
      } else {
        setFilters({ ...filters, [typeSlug]: [tagSlug] })
      }
    } else {
      setFilters({ ...filters, [typeSlug]: filters[typeSlug].filter(item => item !== tagSlug) })
    }
  }




  return (
    <Sidebar sidebarData={sidebarData} filters={filters} onClickCheckbox={onClickCheckbox} />
  )
}


*/

