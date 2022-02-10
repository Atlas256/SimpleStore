import axios from "axios"
import { useEffect, useState } from "react"
import { TSidebarData } from "../../types"


async function getSidebarData() {
    const { data } = await axios.get('http://localhost:5000/api/sidebar')
    return data
}


export default function() {

    const [sidebarData, setSIdebarData] = useState<TSidebarData[]>()



    useEffect(() => {
        getSidebarData().then(())
    })



    return(
        <div></div>
    )
}