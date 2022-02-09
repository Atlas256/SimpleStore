import axios from "axios"
import { useEffect, useState } from "react"
import { NavigateFunction, useNavigate } from "react-router"
import Categories from "../../components/Categories"
import { TCategoryData, TSidebarData } from "../../types"




async function getCategories() {
  const { data } = await axios.get('http://localhost:5000/api/categories')
  return data['categories']
}

const handlerClickCategory = (navigate: NavigateFunction) => (slug: string) => {
  navigate(`./category=${slug}/`)
}

export default function () {

  const [categories, setCategories] = useState<TCategoryData[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getCategories().then((categories) => setCategories([...categories]))
  }, [])

  const onClickCategory = handlerClickCategory(navigate)


  return (
    <div>
      <Categories categories={categories} onClickCategory={onClickCategory} />
    </div>
  )
}