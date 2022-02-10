import styled from 'styled-components'
import ProductsListContainer from '../../containers/ProductsPage/ProductsListContainer'
import SidebarContainer from '../../containers/ProductsPage/__SidebarContainer'



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
      <SidebarContainer />
      {/*<ProductsListContainer />*/}
    </Page>
  )
}