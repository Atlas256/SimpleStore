import styled from 'styled-components'
import { TEditSection } from '../../types';




const FieldBody = styled.div` 
  border: 1px solid #0001;
  box-shadow: 0px 0px 4px #0002;
  margin-top: 10px;
`

const handlerOnChange = (editItem: any, setEditItem: any) => (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
  
  const value = event.target.value;
  
  setEditItem({...editItem, [key]: value})
}

const handlerOnClose = (setIsShowEditPanel: TProps['setIsShowEditPanel']) => () => {
  setIsShowEditPanel(false)
}


type TProps = {
  EDIT_SECTION: TEditSection[]
  editItem: { [key: string]: unknown }
  setEditItem: React.Dispatch<React.SetStateAction<{}>>
  setIsShowEditPanel: React.Dispatch<React.SetStateAction<boolean>>
  onClickSave: () => void
}



export default function EditPanel({ EDIT_SECTION, editItem, setEditItem, setIsShowEditPanel, onClickSave }: TProps) {



  const onChange = handlerOnChange(editItem, setEditItem)
  const onClose = handlerOnClose(setIsShowEditPanel)

  return (
    <FieldBody>
      {
        EDIT_SECTION.map(section =>
          <div 
          key={section.name}
          style={{ display: 'flex' }}>
            <div>{section.name}</div>
            <input
            onChange={onChange(section.field)}
            style={{ border: '1px solid blue' }}
            value={`${editItem[section.field]}`}
            type="text" />
          </div>
        )
      }
      <div style={{ display: 'flex' }}>
        <button
          onClick={onClose}
          style={{ background: '#FF0', padding: '20px' }}>CLOSE</button>
        <button
          onClick={onClickSave}
          style={{ background: '#0F0', padding: '20px' }}>SAVE</button>
      </div>
    </FieldBody>
  )
}