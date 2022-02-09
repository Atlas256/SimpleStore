import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import { TItem, TTableSection } from "../../../types"
import TableHeader from './TableHeader'




const Table = styled.div`
  width: 100%;
  box-shadow: 0px 0px 4px #0002;
  border: 1px solid #0001;
  overflow: hidden;
`

const TableBody = styled.div`
  max-height: ${60 * 10}px;
  display: flex;
  flex-direction: column;
`

const TableLine = styled.div`
  min-height: 40px;
  font-size: 14px;
  display: grid;
  border-bottom: 1px solid #0002;
  padding: 0px 10px;

`
const LineItem = styled.div` 
  margin-right: 20px;
  overflow-x: hidden;
  overflow-y: hidden;

  display: flex;
  align-items: center;
`

const handlerEditItem = (setIsShowEditPanel: TProps['setIsShowEditPanel'], setEditItem: TProps['setEditItem']) => (item: TItem) => () => {
  setIsShowEditPanel(true)
  setEditItem(item)
}


type TProps = {
  TABLE_SECTION: TTableSection[]
  items: TItem[]
  setEditItem: React.Dispatch<React.SetStateAction<{}>>
  setIsShowEditPanel: React.Dispatch<React.SetStateAction<boolean>>
  onClickDelete: (ID: string) => void
}

export default function ({ TABLE_SECTION, items, setEditItem, setIsShowEditPanel, onClickDelete }: TProps) {

  const SECTION_SIZE = `repeat(${TABLE_SECTION.length}, ${80 / TABLE_SECTION.length}%) 10% 10%`



  const onClickEdit = handlerEditItem(setIsShowEditPanel, setEditItem)



  return (
    <Table>
      <TableHeader TABLE_SECTION={TABLE_SECTION} SECTION_SIZE={SECTION_SIZE} />
      <TableBody>
        {
          items.map((item: TItem) =>
            <TableLine
              key={item['_id']}
              style={{ gridTemplateColumns: SECTION_SIZE }}>
              {
                TABLE_SECTION.map((section: TTableSection) =>
                  <LineItem key={section.name}>{item[section.field]}</LineItem>
                )
              }
              <Button
                variant="warning"
                onClick={onClickEdit({ ...item })}
              >EDIT</Button>
              <Button
                variant="danger"
                onClick={() => onClickDelete(String(item['_id']))}
              >DELETE</Button>
            </TableLine>
          )
        }
      </TableBody>
    </Table>
  )
}
