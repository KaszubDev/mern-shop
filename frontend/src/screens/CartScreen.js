import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { addToCart, removeFromCart } from '../actions/cartActions';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  td, th {
    padding: 10px;
  }
`

const TableRow = styled.tr.attrs(props => ({
  key: props.key
}))`

`

const TotalPrice = styled.span`
  display: block;
  text-align: right;
  margin-top: 20px;
  font-weight: 500;
`

const CheckoutButton = styled.button.attrs(props => ({
  onClick: props.onClick
}))`
  display: inline-block;
  cursor: pointer;
    background-color: #000;
    border: 1px solid #000;
    padding: 10px 15px;
    margin-top: 20px;
    border-radius: 50px;
    color: #fff;
    transition: all .25s ease-in-out;
    &:hover {
        background-color: #fff;
        color: #000;
    }
`

const RemoveButton = styled.button.attrs(props => ({
  onClick: props.onClick
}))`
  color: red;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

function CartScreen(props){
    document.title = `Mern Shop - Cart`
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const {id} = useParams()
    const dispatch = useDispatch()
    const productRemoveHandler = (productId) => {
      dispatch(removeFromCart(productId))
    }
    const navigate = useNavigate()
    const checkoutHandler = () => {
      navigate('/login?redirect=checkout')
    }

    useEffect(() => {
      if (id){
          dispatch(addToCart(id))
      };
      return () => {
        ;
      };
    }, [id, dispatch]);

    return (
        <div>
          <Link to="/" className='backBtn'>Back to home</Link>
          <h1>Cart</h1>
          {cartItems.length === 0 ? <p>Cart is empty</p> :
          <div>
            <Table>
              <thead>
                <TableRow>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Actions</th>
                </TableRow>
              </thead>
              <tbody>
              {cartItems.map(item =>
              <TableRow key={item.product}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td><RemoveButton onClick={() => productRemoveHandler(item.product)}>Delete</RemoveButton></td>
              </TableRow>
              )}
              </tbody>
            </Table>
            <TotalPrice>Total: ${cartItems.reduce((a,c) => a + c.price, 0)}</TotalPrice>
            <div align="right">
              <CheckoutButton onClick={checkoutHandler}>Go to checkout</CheckoutButton>
            </div>
          </div>
          }
        </div>
    )
}

export default CartScreen