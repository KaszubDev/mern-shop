import styled from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'

const Header = styled.header`
  width: 100%;
  height: 100px;
  background-color: #252525;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 700;
`

const Footer = styled.footer`
  background-color: #000;
  width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`

const Main = styled.main`
  max-width: 1320px;
  padding-left: 20px;
  padding-right: 20px;
  margin: 30px auto;
  min-height: 65vh;
`

function App() {
  return (
  <BrowserRouter>
    <Header>
      Real Big Shop
    </Header>
    <Main>
      <Routes>
        <Route path="/" exact="true" element={<HomeScreen/>} />
        <Route path="/products/:id" element={<ProductScreen/>} />
      </Routes>
    </Main>
    <Footer>
      Happy coding!
    </Footer>
  </BrowserRouter>
  );
}

export default App;
