import styled from 'styled-components'
import { TCardSection, TItem } from '../../types'



const CardBody = styled.div`
  width: 100%;

  padding: 1rem;
`


type TProps = {
  CARD_SECTION: TCardSection[]
  item: { [key: string]: any }
}


export default function ({ CARD_SECTION, item }: TProps) {

  return (
    <div>
      {
        CARD_SECTION.map((section: { [key: string]: string }) =>
          <div key={item._id}>
            <div>{item[section['field']]}</div>
            <br />
          </div>
        )
      }
      <hr />
    </div>
  )
}