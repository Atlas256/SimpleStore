import styled, { createGlobalStyle } from 'styled-components'
import Router from './Router';


const AppRoot = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
  }

  a {
    display: contents;
    
  }

  button {
    border: #0000;
  }

  * {
    letter-spacing: 0.5px
  }
`

const AppWraper = styled.div`
  width: 100%;
  height: 100vh; 
  /*border: 5px solid red;*/
  overflow: hidden;
`




function App() {

  return (
    <>
      <AppRoot />
      <AppWraper>
        <Router />
      </AppWraper>
    </>
  );
}

export default App;

