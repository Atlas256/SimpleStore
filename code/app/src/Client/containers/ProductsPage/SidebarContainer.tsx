import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import parserUrl from "../../../Helpers/parserUrl"
import Sidebar from "../../components/Sidebar"
import { TSidebarData } from "../../types"

export type TFilter = {
    [key: string]: string[]
}

async function getSidebarData(path: string) {
    const { data } = await axios.get('http://localhost:5000/api/sidebar/' + path)
    return data
}


export default function () {

    const location = useLocation().pathname
    const path = location.replace('products', '').replace(/\//g, '')
    const navigate = useNavigate()


    const [sidebarData, setSidebarData] = useState<TSidebarData[]>([])
    const [filters, setFilters] = useState<TFilter>({})

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



    useEffect(() => {

        const newPath = Object.keys(filters).reduce((acc, typeName) => {
            if (filters[typeName].join('')) {
                acc += typeName + '=' + filters[typeName].join(',') + ';'
            }
            return acc
        }, '')

        if (newPath) {
            navigate(newPath)
        } else {
            navigate('/products/')
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
            //if (filters[typeSlug].length > 1) {
                setFilters({ ...filters, [typeSlug]: filters[typeSlug].filter(item => item !== tagSlug) })
            //} else {
                //setFilters({})
            //}
        }
    }


    return (
        <Sidebar sidebarData={sidebarData} filters={filters} onClickCheckbox={onClickCheckbox} />
    )
}