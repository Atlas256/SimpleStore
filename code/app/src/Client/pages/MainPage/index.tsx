import styled from 'styled-components'
import NewsGoods from '../../components/Novelty';



const Page = styled.div`
  width: 100%;
  height: 100%;
  /*border: 5px solid #000;*/

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 50px;
  overflow-y: scroll;
`


export default function () {

  return (
    <Page>
      <div style={{width: '100%', marginBottom: '50px'}}>
        <NewsGoods />
      </div>
    </Page>
  )
}