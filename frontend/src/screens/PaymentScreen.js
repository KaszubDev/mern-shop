import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {savePaymentMethod} from "../actions/cartActions";

const Container = styled.div`
  text-align: center;
  width: 100%;
  h2 {
    font-size: 30px;
  }
  form {
    max-width: 20%;
    margin: 0 auto;
    input {
      margin-bottom: 20px;
      padding: 10px;
      cursor: pointer;
    }
    label {
      cursor: pointer;
    }
  }
  a {
    &:hover {
      text-decoration: underline;
    }
  }
`

const SubmitButton = styled.button `
    width: 100%;
    background-color: #000;
    border: 1px solid #000;
    padding: 10px;
    color: #fff;
    cursor: pointer;
    transition: all .25s ease-in-out;
    margin-top: 10px;
    &:hover {
        background-color: #fff;
        color: #000;
    }
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
                <div>
                    <input required checked type="radio" id="paypal" value="PayPal" name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <label htmlFor="paypal">PayPal</label>
                </div>
                <div>
                    <input required type="radio" id="cash" value="Cash" name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)}/>
                    <label htmlFor="cash">Cash</label>
                </div>
                <SubmitButton type="submit">Submit</SubmitButton>
            </form>
        </Container>
    )
}

export default PaymentScreen