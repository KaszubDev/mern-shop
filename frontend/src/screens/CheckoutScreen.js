import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`

`

function CheckoutScreen(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()

    }

    return (
        <Container>
            <h2>Checkout</h2>
            <form onSubmit={submitHandler}>
                <input required type="text" placeholder='Your address' name='name'/>
                <button type="submit">Submit</button>
            </form>
        </Container>
    )
}

export default CheckoutScreen