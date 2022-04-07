import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../actions/userActions';

const Container = styled.div`

`

function PaymentScreen(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <Container>
            <h2>Payment</h2>
        </Container>
    )
}

export default PaymentScreen