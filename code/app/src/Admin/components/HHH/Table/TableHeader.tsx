import styled from 'styled-components'
import { TTableSection } from '../../../types'




const TableHeader = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  display: grid;
  border-bottom: 1px solid #0003;
  padding: 10px;

  overflow: hidden;
`




type TProps = {
  TABLE_SECTION: TTableSection[]
  SECTION_SIZE: string
}


export default function ({ TABLE_SECTION, SECTION_SIZE }: TProps) {




  return (
    <TableHeader style={{ gridTemplateColumns: SECTION_SIZE }}>
      {
        TABLE_SECTION.map((section: TTableSection) =>
          <div
            key={section.name}
            style={{ display: 'flex', cursor: section.canSort ? 'pointer' : 'default' }}>
            <div>{section.name}</div>
            <div>{section.canSort ? '↓' : null}</div>
          </div>
        )
      }
      <div>EDIT</div>
      <div>DELETE</div>
    </TableHeader>
  )
}