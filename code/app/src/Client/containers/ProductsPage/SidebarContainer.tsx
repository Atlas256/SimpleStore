import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router"
import parserUrl from "../../../Helpers/parserUrl"
import Sidebar from "../../components/Sidebar"
import { TSidebarData } from "../../types"

export type TFilter = {
    [key: string]: string[]
}

async function getSidebarData(location: string) {
    const { data } = await axios.get('http://localhost:5000/api/sidebar/' + location)
    return data
}


export default function () {

    const location = useLocation().pathname.split('products')[1]
    const navigate = useNavigate()


    const [sidebarData, setSidebarData] = useState<TSidebarData[]>([])
    const [filters, setFilters] = useState<TFilter>({})

    useEffect(() => {
        getSidebarData(location).then((data) => {
            setSidebarData(data)
            console.log(data);
            
        })
    }, [location])

    useEffect(() => {
        getSidebarData(location).then((data) => {
            setSidebarData(data)
            console.log(data);
            
        })
    }, [location, ])

    useEffect(() => {
        const parsedData = parserUrl(location)
        //console.log(parsedData);
        setFilters({ ...parsedData['filters'] })
    }, [location])

    useEffect(() => {
        if (filters) {
            const newPath = Object.keys(filters).reduce((acc, typeName) => {
                if (filters[typeName].join('')) {
                    acc += typeName + '=' + filters[typeName].join(',') + ';'
                }
                return acc
            }, '')
            if (filters['category']) {
                navigate(newPath)
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