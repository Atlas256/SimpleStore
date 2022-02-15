import styled from 'styled-components'
import { TCardSection, TItem } from '../../types'



const CardBody = styled.div`
  width: 100%;
  padding: 1rem;
  border: 1px solid #0002;
`

const Field = styled.div`
  width: 100%;
  display: flex;
  word-break:break-all;
`

const FieldName = styled.div`
  min-width: 20%;
`

const FieldData = styled.div`
  width: 100%;
  display: flex;
`


type TProps = {
  CARD_SECTION: TCardSection[]
  item: TItem
}


export default function ({ CARD_SECTION, item }: TProps) {

  return (
    <CardBody>
      {
        CARD_SECTION.map((section) =>
          <Field key={item._id}>
            <FieldName>{section.name}</FieldName>
            <FieldData>{item[section.field]}</FieldData>
          </Field>
        )
      }
      <div>
        {
          item['tags'] && item['tags'].map((tag: TItem) => 
            <div>{tag.title}</div>
          )
        }
      </div>
    </CardBody>
  )
}