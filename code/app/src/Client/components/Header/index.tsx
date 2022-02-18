import { NavigateFunction, useLocation, useNavigate } from 'react-router'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import SearchContainer from '../../containers/SearchContainer'
import { useAppDispatch } from '../../hooks/redux'
import { TAction } from '../../store/reducers/mainReducer'



const Header = styled.div` 
  width: 100%;
  min-height: 60px;
  background: #27F;
  box-shadow: 0 1px 2px #0005;

  font-weight: 600;
  font-size: 24px;
  color: #FFF;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0rem 1rem;
`


const handlerClick = (navigate: NavigateFunction, dispatch: Dispatch<TAction>) => () => {
  dispatch({
    type: "REMOVE_ALL",
    payload: {}
  })
  navigate('/')
}

type TProps = {
  onShowCart: (isShow: boolean) => () => void
}

export default function ({ onShowCart }: TProps) {

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const onClick = handlerClick(navigate, dispatch)




  return (
    <Header>
      <div
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        HOME
      </div>
      <div style={{ margin: '0rem 1rem' }}>
        <SearchContainer />
      </div>
      <button
        style={{ background: '#0000', color: '#FFF' }}
        onClick={onShowCart(true)}
      >CART</button>
    </Header>
  )
}