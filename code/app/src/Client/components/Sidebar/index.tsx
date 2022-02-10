import styled from 'styled-components'
import { Accordion, Form } from 'react-bootstrap'
import { TSidebarData, TTag } from '../../types'
import { TFilter } from '../../containers/ProductsPage/SidebarContainer'


const Body = styled.div`
  width: 200px;
  height: inherit;
  border-right: 1px solid #0004;

  * {
    user-select: none
  }
`


type TProps = {
  sidebarData: TSidebarData[]
  filters: TFilter
  onClickCheckbox: (e: React.ChangeEvent<HTMLInputElement>, typeSlug: string, tagSlug: string) => void
}


export default function ({ sidebarData, filters, onClickCheckbox }: TProps) {


  return (
    <Body>
      <Accordion defaultActiveKey="0">
        {
          sidebarData.map(({type, tags}: TSidebarData) =>
            <Accordion.Item key={type._id} eventKey={type._id} style={{borderRight: 'none'}}>
              <Accordion.Header>{type.title}</Accordion.Header>
              <Accordion.Body>
                {
                  tags.map((tag: TTag) =>
                    <Form.Check
                    checked={filters && filters[type.slug] && filters[type.slug].includes(tag.slug) ? true : false}
                      onChange={e => onClickCheckbox(e, type.slug, tag.slug)}
                      key={tag._id}
                      type={'checkbox'}
                      id={tag._id}
                      label={tag.title}
                    />
                  )
                }
              </Accordion.Body>
            </Accordion.Item>
          )
        }



      </Accordion>
    </Body>
  )
}


