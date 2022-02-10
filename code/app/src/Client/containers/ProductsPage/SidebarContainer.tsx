import axios from "axios"
import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import { TSidebarData } from "../../types"


async function getSidebarData() {
    const { data } = await axios.get('http://localhost:5000/api/sidebar/')
    return data
}


export default function () {

    console.log('SIDEBAR');

    const [sidebarData, setSidebarData] = useState<TSidebarData[]>([])



    useEffect(() => {
        getSidebarData().then((data) => {
            console.log(data);
        })
    }, [])



    return (
        <Sidebar sidebarData={sidebarData} filters={[]} onClickCheckbox={console.log} />
    )
}