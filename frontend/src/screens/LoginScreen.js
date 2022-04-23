import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { login } from '../actions/userActions'

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

const LoginButton = styled.button `
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

function LoginScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userLogin = useSelector((state) => state.userLogin)
    const { loading, userInfo, error } = userLogin
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const redirect = searchParams.get("redirect") ? searchParams.get("redirect") : '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect === '/' ? redirect : '/' + redirect)
        }
      return () => {

      }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <Container>
            <h2>Login</h2>
            { loading && <p>Loading...</p> }
            { error && <p>{error}</p> }
            <form onSubmit={submitHandler}>
                <input type="email" placeholder='Your email' name='email' onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='Your password' name='password' onChange={(e) => setPassword(e.target.value)}/>
                <LoginButton type="submit">Login</LoginButton>
            </form>
            <p>Do not have an account yet?</p>
            <Link to={redirect === '/' ? '/register' : '/register?redirect=' + redirect}>Create new account</Link>
        </Container>
    )
}

export default LoginScreen