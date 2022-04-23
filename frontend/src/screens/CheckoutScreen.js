import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {saveShippingAddress} from "../actions/cartActions";

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
      display: block;
      width: 100%;
      margin-bottom: 10px;
      padding: 10px;
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

function CheckoutScreen(props) {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const cart = useSelector((state) => state.cart)
    const { shippingData } = cart
    const [fullName, setFullName] = useState(shippingData.fullName || '')
    const [address, setAddress] = useState(shippingData.address || '')
    const [city, setCity] = useState(shippingData.city || '')
    const [postalCode, setPostalCode] = useState(shippingData.postalCode || '')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (userInfo == null) {
            navigate('/login')
        }
        return () => {

        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ fullName, address, city, postalCode }))
        navigate('/payment')
    }

    return (
        <Container>
            <h2>Checkout</h2>
            <form onSubmit={submitHandler}>
                <input required type="text" value={fullName} placeholder='Your full name' name='fullName' onChange={(e) => setFullName(e.target.value)}/>
                <input required type="text" value={address} placeholder='Your address' name='address' onChange={(e) => setAddress(e.target.value)}/>
                <input required type="text" value={city} placeholder='Your city' name='city' onChange={(e) => setCity(e.target.value)}/>
                <input required type="text" value={postalCode} placeholder='Your postal code' name='postalCode' onChange={(e) => setPostalCode(e.target.value)}/>
                <SubmitButton type="submit">Submit</SubmitButton>
            </form>
        </Container>
    )
}

export default CheckoutScreen