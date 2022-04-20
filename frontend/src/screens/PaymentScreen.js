import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {savePaymentMethod} from "../actions/cartActions";

const Container = styled.div`

`

function PaymentScreen(props) {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const { shippingData } = cart

    useEffect(() => {
        if (shippingData == null) {
            navigate('/checkout')
        }
        return () => {

        }
    }, [shippingData])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/order')
    }

    return (
        <Container>
            <h2>Payment method</h2>
            <form onSubmit={submitHandler}>
                <input required checked type="radio" id="paypal" value="PayPal" name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)}/>
                <label htmlFor="paypal">PayPal</label>
                <input required type="radio" id="cash" value="Cash" name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)}/>
                <label htmlFor="cash">Cash</label>
                <button type="submit">Submit</button>
            </form>
        </Container>
    )
}

export default PaymentScreen