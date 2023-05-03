import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { addToCart, removeFromCart } from '../actions/cartActions';
import CustomButton from "../components/CustomButton";


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;
  text-align: center;
  td, th {
    padding: 10px;
  }
`

const TableRow = styled.tr.attrs(props => ({
  key: props.key
}))``

const TotalPrice = styled.span`
  display: block;
  text-align: right;
  margin-top: 20px;
  font-weight: 500;
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

const ChangeQuantityButton = styled.button.attrs(props => ({
  onClick: props.onClick
}))`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-weight: 700;
  padding: 0 10px;
  font-size: 1.3rem;
  &:hover {
    transform: scale(1.2);
  }
`

function CartScreen(props){
    document.title = `Mern Shop - Cart`
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const {id} = useParams()
    const dispatch = useDispatch()

    const productRemoveAllHandler = (productId, isDeleteAll) => {
      dispatch(removeFromCart(productId, isDeleteAll))
    }

    const productRemoveHandler = (productId) => {
      dispatch(removeFromCart(productId))
    }
    const navigate = useNavigate()
    const checkoutHandler = () => {
      navigate('/login?redirect=checkout')
    }

    const addItemToCart = (productId) => {
      dispatch(addToCart(productId))
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
                  <th>Quantity</th>
                  <th>Actions</th>
                </TableRow>
              </thead>
              <tbody>
              {cartItems.map(item =>
              <TableRow key={item.product}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <div className='d-flex align-items-center justify-center'>
                    <ChangeQuantityButton onClick={() => productRemoveHandler(item.product)}>-</ChangeQuantityButton>
                    {item.quantity}
                    <ChangeQuantityButton onClick={() => addItemToCart(item.product)}>+</ChangeQuantityButton>
                  </div>
                </td>
                <td><RemoveButton onClick={() => productRemoveAllHandler(item.product, true)}>Delete</RemoveButton></td>
              </TableRow>
              )}
              </tbody>
            </Table>
            <TotalPrice>Total: ${cartItems.reduce((accumulator,item) => accumulator + (item.price * item.quantity), 0)}</TotalPrice>
            <div align="right">
                <CustomButton onClick={checkoutHandler} text="Go to checkout"></CustomButton>
            </div>
          </div>
          }
        </div>
    )
}

export default CartScreen