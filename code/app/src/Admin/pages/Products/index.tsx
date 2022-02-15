import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import CardListContainer from '../../containers/CardListContainer'
import { TCardSection, TEditSection, TTableSection } from '../../types'



const PATH = 'products'

const CARD_SECTION: TCardSection[] = [
  {
    name: 'ID',
    field: '_id',
  },
  {
    name: 'TITLE',
    field: 'title'
  },
  {
    name: 'SLUG',
    field: 'slug',
  },
  {
    name: 'PRICE',
    field: 'price',
  },
  {
    name: 'DISCOUNT',
    field: 'discount'
  },
  {
    name: 'CREATE',
    field: 'createdDate',
  },
  {
    name: 'UPDATE',
    field: 'updatedDate',
  }
]

const EDIT_SECTION: any[] = [
  {
    name: 'TITLE',
    field: 'title'
  }
]


export default function () {

  return (
    <>
      <div style={{ width: '100%', fontSize: '32px', color: '#222', textAlign: 'center', padding: '10px', marginBottom: '50px' }}>
        PRODUCTS
      </div>


      <CardListContainer CARD_SECTION={CARD_SECTION}/>
    </>
  )
}