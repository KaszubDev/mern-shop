import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { login } from '../actions/userActions'

const Container = styled.div`

`

function LoginScreen(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userLogin = useSelector(state => state.userLogin)
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
                <button type="submit">Login</button>
            </form>
            <p>Do not have an account yet?</p>
            <Link to={redirect === '/' ? '/register' : '/register?redirect=' + redirect}>Create new account</Link>
        </Container>
    )
}

export default LoginScreen