import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../actions/userActions';

const Container = styled.div`

`

function RegisterScreen(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const userRegister = useSelector(state => state.userRegister)
    const { loading, userInfo, error } = userRegister
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const redirect = searchParams.get("redirect") ? searchParams.get("redirect") : '/'

    console.log(redirect)

    useEffect(() => {
        if (userInfo) {
            navigate(redirect === '/' ? redirect : '/' + redirect)
        }
      return () => {

      }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(name, email, password))
    }

    return (
        <Container>
            <h2>Register</h2>
            <form onSubmit={submitHandler}>
                <input required type="text" placeholder='Your name' name='name' onChange={(e) => setName(e.target.value)}/>
                <input required type="email" placeholder='Your email' name='email' onChange={(e) => setEmail(e.target.value)}/>
                <input required type="password" placeholder='Your password' name='password' onChange={(e) => setPassword(e.target.value)}/>
                <input required type="password" placeholder='Your password' name='rePassword' onChange={(e) => setRePassword(e.target.value)}/>
                <button type="submit">Create new account</button>
            </form>
            <p>Have got an account already?</p>
            <Link to={redirect === '/' ? '/login' : '/login?redirect=' + redirect}>Go to login screen</Link>
        </Container>
    )
}

export default RegisterScreen