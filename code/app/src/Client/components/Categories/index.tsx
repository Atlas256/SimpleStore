import styled from 'styled-components'
import { TCategoryData } from '../../types'



const Body = styled.div`
  width: 400px;
  height: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10px;
`

const Title = styled.div` 
  font-size: 24px;
  font-weight: 600;
  color: #222;
`

const CategoriesList = styled.div`
  display: flex;
  flex-wrap: wrap;
`




type TProps = {
  categories: TCategoryData[]
  onClickCategory: (slug: string) => void
}


export default function ({ categories, onClickCategory }: TProps) {


  return (
    <Body>
      <Title>CATEGORIES</Title>
      <CategoriesList>
        {
          categories.map((category, idx) => {

            const r = 255 % (Math.sin(idx+Date.now())+1.1)*255
            const g = 255 % (-Math.sin(idx+Date.now())+1.1)*255
            const b = 255 % (Math.cos(idx+Date.now())+1.1)*255
            const color = `rgb(${r}, ${g}, ${b})`

            
            return <button
            style={{fontSize: '22px', padding: '0.5rem 1rem', margin: '5px', background: '#0000', color: color, border: `1px solid ${color}`}}
            key={category._id} 
            onClick={() => onClickCategory(category.slug)}>
              {category.title}
            </button>
          })
        }
      </CategoriesList>
    </Body>
  )
}