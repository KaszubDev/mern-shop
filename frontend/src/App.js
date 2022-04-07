import styled from 'styled-components'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import { useSelector } from 'react-redux'
import ProfileScreen from './screens/ProfileScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import PaymentScreen from "./screens/PaymentScreen";
import OrderScreen from "./screens/OrderScreen";

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
  .headerRightButtons {
    position: absolute;
    right: 35px;
    display: flex;
    align-items: center;
  }
  .loginBtn {
    margin-right: 20px;
    color: #fff;
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
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
  <BrowserRouter>
    <Header>
      <Link to="/"><h1>Real Big Shop</h1></Link>
      <div className='headerRightButtons'>
        {
          userInfo ? <Link className='loginBtn' to='/profile'>{userInfo.name}</Link> :
          <Link to="/login" className='loginBtn'>Login</Link>
        }
        <Link to="/cart"><img src='/uploads/cart-icon.png'/></Link>
      </div>
    </Header>
    <Main>
      <Routes>
        <Route path="/" exact="true" element={<HomeScreen/>}/>
        <Route path='/register' element={<RegisterScreen/>}/>
        <Route path='/login' element={<LoginScreen/>}/>
        <Route path="/cart/:id" element={<CartScreen/>}/>
        <Route path="/cart" element={<CartScreen/>}/>
        <Route path="/products/:id" element={<ProductScreen/>}/>
        <Route path="/profile" element={<ProfileScreen/>}/>
        <Route path='/checkout' element={<CheckoutScreen/>}/>
        <Route path='/payment' element={<PaymentScreen/>}/>
        <Route path='/order' element={<OrderScreen/>}/>
      </Routes>
    </Main>
    <Footer>
      Happy coding!
    </Footer>
  </BrowserRouter>
  );
}

export default App;
