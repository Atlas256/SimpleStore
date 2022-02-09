import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import ContactDataContainer from '../../containers/Checkout/ContactDataContainer'
import DeliveryDataContainer from '../../containers/Checkout/DeliveryDataContainer'
import PayDataContainer from '../../containers/Checkout/PayDataContainer'



const Page = styled.div` 
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 1rem;
  overflow-y: scroll;
`

const PageInner = styled.div`
  max-width: 40rem;
`

const PageTitle = styled.div` 
  font-size: 32px;
`


export default function () {


  return (
    <Page>
      <PageInner>
        <PageTitle>Оформление заказа</PageTitle>

        <ContactDataContainer />
        <DeliveryDataContainer />
        <PayDataContainer />

        <Button variant="primary">Заказ потверждаю</Button>
      </PageInner>
    </Page>
  )
}