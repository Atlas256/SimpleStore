import styled from 'styled-components'
import PageContainer from '../../containers/ProductsPage/PageContainer'



const Page = styled.div`
  width: 100%;
  height: 100%;
  /*border: 5px solid #FC0;*/
  display: flex;
  flex-direction: row;
`


export default function () {

  return (
    <Page>
      <PageContainer />
    </Page>
  )
}