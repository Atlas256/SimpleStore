import axios from 'axios'
import { TEditSection, TItem, TTableSection } from "../types";
import { useEffect, useMemo, useState } from "react";
import Table from "../components/HHH/Table";
import { useLocation, useNavigate } from 'react-router';
import { parserParams } from '../helpers/parserParams'
import ControllPanel from '../components/HHH/ControllPanel';
import EditPanel from '../components/HHH/EditPanel';
import { createItem, deleteItem, saveItem } from '../helpers/http';







const handlerSaveItem = (URL_PATH: string, editItem: TItem) => () => {
  const ID = editItem['_id']

  if (ID) {
    saveItem(URL_PATH, ID, editItem)
  } else {
    createItem(URL_PATH, editItem)
  }
}

const handlerDeleteItem = (URL_PATH: string) => (ID: string) => {
  deleteItem(URL_PATH, ID)
}

const handlerCreateItem = (
  EDIT_SECTION: TEditSection[],
  setEditItem: React.Dispatch<React.SetStateAction<TItem>>,
  setIsShowEditPanel: React.Dispatch<React.SetStateAction<boolean>>) => () => {

    setEditItem(EDIT_SECTION.reduce((voidItem: TItem, section) => {
      voidItem[section.field] = ''
      return voidItem
    }, {}))
    setIsShowEditPanel(true)
  }



type TProps = {
  URL_PATH: string
  TABLE_SECTION: TTableSection[]
  EDIT_SECTION: TEditSection[]
}



export default function ({ URL_PATH, TABLE_SECTION, EDIT_SECTION }: TProps) {
  const location = useLocation().pathname

  const [items, setItems] = useState<TItem[]>([])
  const [pageCount] = useState(4)
  const [params, setParams] = useState<{ [key: string]: any }>({})
  const [editItem, setEditItem] = useState<TItem>({})
  const [isShowEditPanel, setIsShowEditPanel] = useState<boolean>(false)


  useEffect(() => {
    if (location !== `/admin/${URL_PATH}`) {
      const paramsString = location.slice(location.lastIndexOf('/'))
      setParams(
        parserParams(paramsString)
      )
    }
  }, [location])

  useEffect(() => {
    if (Object.keys(params).length !== 0) {
      axios.get(`http://localhost:5000/api/${URL_PATH}/page=${params['page']}`).then((data) => {
        setItems(data.data)
      })
      
    } else {
      axios.get(`http://localhost:5000/api/${URL_PATH}`).then((data) => {
        setItems(data.data)
      })
    }
  }, [params])



  const onClickSave = handlerSaveItem(URL_PATH, editItem)
  const onClickCreate = handlerCreateItem(EDIT_SECTION, setEditItem, setIsShowEditPanel)
  const onClickDelete = handlerDeleteItem(URL_PATH);


  return (
    <>
      <ControllPanel
        pageCount={pageCount}
        onClickCreate={onClickCreate}
      />
      <Table
        TABLE_SECTION={TABLE_SECTION}
        items={items}
        setEditItem={setEditItem}
        setIsShowEditPanel={setIsShowEditPanel}
        onClickDelete={onClickDelete}
      />
      {
        isShowEditPanel
        &&
        <EditPanel
          EDIT_SECTION={EDIT_SECTION}
          editItem={editItem}
          setEditItem={setEditItem}
          setIsShowEditPanel={setIsShowEditPanel}
          onClickSave={onClickSave}
        />
      }
    </>
  )
}