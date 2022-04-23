import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import styled from 'styled-components';
import { register } from '../actions/userActions';

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

const RegisterButton = styled.button `
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

function RegisterScreen(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const userRegister = useSelector((state) => state.userRegister)
    const { loading, userInfo, error } = userRegister
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const redirect = searchParams.get("redirect") ? searchParams.get("redirect") : '/'

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
                <RegisterButton type="submit">Create new account</RegisterButton>
            </form>
            <p>Have got an account already?</p>
            <Link to={redirect === '/' ? '/login' : '/login?redirect=' + redirect}>Go to login screen</Link>
        </Container>
    )
}

export default RegisterScreen