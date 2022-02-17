import axios from "axios"
import { useMemo, useState } from "react"
import { useLocation } from "react-router"
import Sidebar from "../../components/Sidebar"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { TSidebarData } from "../../types"




export type TFilter = {
    [key: string]: string[]
}


async function getSidebarData(path: string) {
    const { data } = await axios.get('http://localhost:5000/api/sidebar/' + path)
    return data
}


export default function () {

    const location = decodeURI(useLocation().pathname)
    const path = location.replace('products', '').replace(/\//g, '')

    const [sidebarData, setSidebarData] = useState<TSidebarData[]>([])


    const { filters } = useAppSelector(store => store.mainReducer)
    const dispatch = useAppDispatch()


    useMemo(() => {
        getSidebarData(path).then((data) => {
            setSidebarData(data)
        })
    }, [])

    useMemo(() => {
        getSidebarData(path).then((data) => {
            setSidebarData(data)
        })
    }, [location])



    const onClickCheckbox = (e: React.ChangeEvent<HTMLInputElement>, typeSlug: string, tagSlug: string) => {
        if (e.target.checked) {
            if (filters[typeSlug]) {
                dispatch({
                    type: "CHANGE_FILTERS", 
                    payload: { ...filters, [typeSlug]: [...filters[typeSlug], tagSlug] }
                })
            } else {
                dispatch({
                    type: "CHANGE_FILTERS", 
                    payload: { ...filters, [typeSlug]: [tagSlug] }
                })
            }
        } else {
            dispatch({
                type: "CHANGE_FILTERS", 
                payload: { ...filters, [typeSlug]: filters[typeSlug].filter((item: any) => item !== tagSlug) }
            })
        }
    }


    return (
        <Sidebar sidebarData={sidebarData} filters={filters} onClickCheckbox={onClickCheckbox} />
    )
}