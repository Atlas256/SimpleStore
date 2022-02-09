import { Provider } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { store } from "../Client/store";
import styled from 'styled-components'
import NavContainer from "./containers/NavContainer";
import Users from "./pages/Users";
import Tags from "./pages/Tags";
import Types from "./pages/Types";
import Products from "./pages/Products";

const MainWrapper = styled.div` 
  width: 100%;
  height: 100%;
  display: flex;
`

const MainPage = styled.div` 
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  padding: 50px;
`

export default function () {

  return (
    <Provider store={store}>
      <MainWrapper>
        <NavContainer />
        <MainPage>
          <Routes>
            <Route path="/users/*" element={<Users />} />
            <Route path="/tags/*" element={<Tags />} />
            <Route path="/types/*" element={<Types />} />
            <Route path="/products/*" element={<Products />} />
          </Routes>
        </MainPage>
      </MainWrapper>
    </Provider>
  )
}