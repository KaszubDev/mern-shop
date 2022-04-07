import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const Container = styled.div`

`

function ProfileScreen(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const LogoutUser = () => {
        dispatch(logout())
    }

    useEffect(() => {
        if(!userInfo) {
            navigate("/")
        }
      return () => {

      }
    }, [userInfo])

    return (
        <Container>
            {userInfo ? <h2>Hello, {userInfo.name}</h2> : null}
            <button onClick={LogoutUser}>Logout</button>
        </Container>
    )
}

export default ProfileScreen