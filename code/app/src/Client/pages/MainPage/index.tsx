import { useMemo } from 'react';
import styled from 'styled-components';
import NewsGoods from '../../components/Novelty';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';



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

  const dispatch = useAppDispatch()

  useMemo(() => {
    dispatch({
      type: "REMOVE_ALL",
      payload: {}
    })
  }, [])


  return (
    <Page>
      <div style={{ width: '100%', marginBottom: '50px' }}>
        <NewsGoods />
      </div>
    </Page>
  )
}