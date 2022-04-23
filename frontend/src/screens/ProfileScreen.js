import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import CustomButton from "../components/CustomButton";

const Container = styled.div`
  text-align: center;
  width: 100%;
  padding-top: 10px;
  h2 {
    font-size: 30px;
  }
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
            <CustomButton onClick={LogoutUser} text="Logout"></CustomButton>
        </Container>
    )
}

export default ProfileScreen