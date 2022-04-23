import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {createOrder} from "../actions/orderActions";
import {ORDER_CREATE_RESET} from "../constants/orderConstants";
import CustomButton from "../components/CustomButton";

const Container = styled.div`

`

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
}))``

const TotalPrice = styled.span`
  display: block;
  text-align: right;
  margin-top: 20px;
  font-weight: 500;
`

const ConfirmButton = styled.button.attrs(props => ({
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

function OrderScreen(props) {
    const cart = useSelector(state => state.cart)
    const { cartItems, shippingData, paymentMethod } = cart
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderCreate = useSelector(state => state.orderCreate)
    const {loading, success, error, order} = orderCreate

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment')
        }
        if (!shippingData.address) {
            navigate('/shipping')
        }
        if (success) {
            navigate('/order/' + order._id)
            dispatch({
                type: ORDER_CREATE_RESET
            })
        }
        return () => {

        }
    }, [shippingData, cart.paymentMethod, success, dispatch, order])

    const toPrice = (num) => Number(num.toFixed(2))
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.price, 0))

    // To Improve!
    cart.shippingPrice = 20
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createOrder({...cart, orderItems: cart.cartItems}))
    }

    return (
        <Container>
            <h2>Order summary</h2>
            <h3>Shipping:</h3>
            <p><strong>Name: </strong>{cart.shippingData.fullName}</p>
            <p><strong>Address: </strong>{cart.shippingData.address}, {cart.shippingData.postalCode} {cart.shippingData.city}</p>
            <h3>Payment: </h3>
            <p><strong>Method: </strong>{cart.paymentMethod}</p>
            <h3>Order Items:</h3>
            {cartItems.length === 0 ? <p>Cart is empty</p> :
            <div>
                <Table>
                    <thead>
                    <TableRow>
                        <th>Product</th>
                        <th>Price</th>
                    </TableRow>
                    </thead>
                    <tbody>
                    {cartItems.map(item =>
                        <TableRow key={item.product}>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                        </TableRow>
                    )}
                    </tbody>
                </Table>
                <TotalPrice>Total: ${cart.itemsPrice}</TotalPrice>
                <div align="right">
                    <CustomButton onClick={submitHandler} text="Place order"></CustomButton>
                </div>
                {loading && <p>{loading}</p>}
                {error && <p>{error}</p>}
            </div> }

        </Container>
    )
}

export default OrderScreen