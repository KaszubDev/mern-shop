import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {saveShippingAddress} from "../actions/cartActions";

const Container = styled.div`

`

function CheckoutScreen(props) {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const cart = useSelector(state => state.cart)
    const { shippingData } = cart
    const [fullName, setFullName] = useState(shippingData.fullName)
    const [address, setAddress] = useState(shippingData.address)
    const [city, setCity] = useState(shippingData.city)
    const [postalCode, setPostalCode] = useState(shippingData.postalCode)
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
                <button type="submit">Submit</button>
            </form>
        </Container>
    )
}

export default CheckoutScreen