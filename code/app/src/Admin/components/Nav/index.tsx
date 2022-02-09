import { Link } from 'react-router-dom'
import styled from 'styled-components'



type TProps = {
  BUTTONS: string[]
}

export default function ({ BUTTONS }: TProps) {

  return (
    <div
      style={{ background: '#2c2c2c', height: '100%', minWidth: '200px' }}>
      <div
        style={{ display: 'flex', flexDirection: 'column' }}>
        {
          BUTTONS.map((name: string) =>
            <Link to={`${name.toLowerCase()}`}>
              <button
                key={name}
                style={{ color: '#FFF', background: '#0000', padding: '10px', borderBottom: '1px solid #222' }}>
                {name}
              </button>
            </Link>
          )
        }
      </div>
    </div>
  )
}