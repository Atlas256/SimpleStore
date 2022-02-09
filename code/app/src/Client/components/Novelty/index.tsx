import styled from 'styled-components'



const Body = styled.div`
  width: 100%;
  height: 300px;
  background: blue;

  font-size: 48px;
  font-weight: 600;
  color: #FFF;

  display: flex;
  justify-content: center;
  align-items: center;
`


const title = 'НОВИНКИ'

export default function() {



  return(
    <Body>
      <div>{title}</div>
    </Body>
  )
}