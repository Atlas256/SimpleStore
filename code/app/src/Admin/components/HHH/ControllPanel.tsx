import { useMemo } from 'react'
import { Button } from 'react-bootstrap'
import { NavigateFunction, useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'



const Panel = styled.div` 
  width: 100%;
  border: 1px solid #0002;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`




const ButtonPages = styled.div`

  display: flex;
`

const createButtonList = (pageCount: number, navigate: NavigateFunction) =>
  Array(pageCount).fill('').map((_, idx) =>
    <Button
      variant="outline-success"
      key={`./page=${(idx + 1)}`}
      onClick={() => navigate(`./page=${(idx + 1)}`)}>
      {idx + 1}
    </Button>
  )



type TProps = {
  pageCount: number
  onClickCreate: () => void
}


export default function ({ pageCount, onClickCreate }: TProps) {

  const navigate = useNavigate()

  const buttonList = useMemo(() =>
    createButtonList(pageCount, navigate)
    , [pageCount])



  return (
    <Panel>
      <Button
      variant="primary"
        onClick={onClickCreate}>
        NEW
      </Button>
      <ButtonPages>
        {
          buttonList
        }
      </ButtonPages>
    </Panel>
  )
}