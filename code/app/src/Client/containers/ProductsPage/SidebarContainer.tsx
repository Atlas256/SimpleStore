import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import parserUrl from "../../../Helpers/parserUrl"
import Sidebar from "../../components/Sidebar"
import { useAppSelector } from "../../hooks/redux"
import { TSidebarData } from "../../types"




export type TFilter = {
    [key: string]: string[]
  }
  


async function getSidebarData(path: string) {
    const { data } = await axios.get('http://localhost:5000/api/sidebar/' + path)
    return data
}




export default function () {

    const location = decodeURI( useLocation().pathname )
    const path = location.replace('products', '').replace(/\//g, '') 
    const navigate = useNavigate()


    const [sidebarData, setSidebarData] = useState<TSidebarData[]>([])
    const [filters, setFilters] = useState<TFilter>({})


    const mainReducer = useAppSelector(store => store.mainReducer)

    useMemo(() => {
        getSidebarData(path).then((data) => {
            setSidebarData(data)
        })
        if (path) {
            const parsedData = parserUrl(path)
            setFilters({ ...parsedData['filters'] })
        }
    }, [])

    useMemo(() => {
        getSidebarData(path).then((data) => {
            setSidebarData(data)
        })
        if (path) {
            const parsedData = parserUrl(path)
            setFilters({ ...parsedData['filters'] })
        }
    }, [location])

    useMemo(() => {

        let newPath = Object.keys(filters).reduce((acc, typeName) => {
            if (filters[typeName].join('')) {
                acc += typeName + '=' + filters[typeName].join(',') + ';'
            }
            return acc
        }, '')


        if (mainReducer.text) {
            newPath += `text=${mainReducer.text}`
        }

        if (newPath) {
            navigate('./'+newPath)
        } else {
            navigate('/products/')
        }
    }, [filters, mainReducer.text])




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