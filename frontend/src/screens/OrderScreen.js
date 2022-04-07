import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../actions/userActions';

const Container = styled.div`

`

function OrderScreen(props) {
    const cart = useSelector(state => state.cart)
    const { cartItems, shipping, payment } = cart
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (!shipping.address) {
        navigate('/shipping')
    }

    if (!payment.paymentMethod) {
        navigate('/payment')
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <Container>
            <h2>Order</h2>
        </Container>
    )
}

export default OrderScreen