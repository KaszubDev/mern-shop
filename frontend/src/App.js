import styled from 'styled-components'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

const Header = styled.header`
  width: 100%;
  height: 100px;
  background-color: #252525;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
  position: relative;
  h1 {
    color: #fff;
    font-size: 1.8rem;
    font-weight: 700;
  }
  .headerCartBtn {
    position: absolute;
    right: 35px;
  }
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
  min-height: 80vh;
`

function App() {
  return (
  <BrowserRouter>
    <Header>
      <Link to="/"><h1>Real Big Shop</h1></Link>
      <div className='headerCartBtn'>
        <Link to="/cart"><img src='/uploads/cart-icon.png'/></Link>
      </div>
    </Header>
    <Main>
      <Routes>
        <Route path="/" exact="true" element={<HomeScreen/>} />
        <Route path="/cart/:id" element={<CartScreen/>}/>
        <Route path="/cart" element={<CartScreen/>}/>
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
