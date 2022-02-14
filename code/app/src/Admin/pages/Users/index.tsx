import styled from 'styled-components'
import TableContainer from '../../containers/TableContainer'
import { TEditSection, TTableSection } from '../../types'



const URL_PATH = 'users'

const TABLE_SECTION: TTableSection[] = [
  {
    name: 'ID',
    field: '_id',
    canSort: false
  },
  {
    name: 'NAME',
    field: 'name',
    canSort: true
  },
  {
    name: 'EMAIL',
    field: 'email',
    canSort: true
  },
  {
    name: 'PASSWORD',
    field: 'password',
    canSort: true
  },
]

const EDIT_SECTION: TEditSection[] = [
  {
    name: 'NAME',
    field: 'name'
  },
  {
    name: 'EMAIL',
    field: 'email'
  },
  {
    name: 'PASSWORD',
    field: 'password'
  }
]


export default function () {

  return (
    <>
      <div style={{ width: '100%', fontSize: '32px', color: '#222', textAlign: 'center', padding: '10px', marginBottom: '50px' }}>
        USERS
      </div>

      <TableContainer URL_PATH={URL_PATH} TABLE_SECTION={TABLE_SECTION} EDIT_SECTION={EDIT_SECTION} />
    </>
  )
}