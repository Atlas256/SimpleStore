import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import TableContainer from '../../containers/TableContainer'
import { TEditSection, TTableSection } from '../../types'



const PATH = 'tags'

const TABLE_SECTION: TTableSection[] = [
  {
    name: 'ID',
    field: '_id',
    canSort: false
  },
  {
    name: 'TITLE',
    field: 'title',
    canSort: true
  },
  {
    name: 'SLUG',
    field: 'slug',
    canSort: true
  },
  {
    name: 'TYPE ID',
    field: 'typeID',
    canSort: true
  },
]

const EDIT_SECTION: TEditSection[] = [
  {
    name: 'TITLE',
    field: 'title'
  },
  {
    name: 'SLUG',
    field: 'slug'
  },
  {
    name: 'TYPE ID',
    field: 'typeID'
  }
]


export default function () {

  const navigate = useNavigate()
  useEffect(() => {
    navigate('./page=1')
  }, [])

  return (
    <>
      <div style={{ width: '100%', fontSize: '32px', color: '#222', textAlign: 'center', padding: '10px', marginBottom: '50px' }}>
        TAGS
      </div>

      <TableContainer URL_PATH={PATH} TABLE_SECTION={TABLE_SECTION} EDIT_SECTION={EDIT_SECTION}/>
    </>
  )
}