import { NavigateFunction, useNavigate } from 'react-router'
import styled from 'styled-components'



const Header = styled.div` 
  width: 100%;
  min-height: 80px;
  background: #27F;
  box-shadow: 0 1px 2px #0005;

  font-weight: 600;
  font-size: 24px;
  color: #FFF;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`


const handlerClick = (navigate: NavigateFunction) => () => {

  navigate('')
}

type TProps = {
  onShowCart: (isShow: boolean) => () => void
}

export default function({onShowCart}:  TProps) {

  const navigate = useNavigate()
  const onClick = handlerClick(navigate)

  return(
    <Header>
      <div style={{cursor: 'pointer'}} onClick={onClick}>HOME</div>
      <button 
      style={{background: '#0000', color: '#FFF9'}}
      onClick={onShowCart(true)}
      >CART</button>
    </Header>
  )
}