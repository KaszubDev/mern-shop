import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../constants/global"
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"

const login = (email, password) => async (dispatch) => {
    dispatch({
        type: USER_LOGIN_REQUEST,
        payload: {email, password}
    })
    try {
        const {data} = await axios.post(API_URL + "users/signin", {email, password})
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        Cookies.set("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message
        })
    }
}

const register = (name, email, password) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: {name, email, password}
    })
    try {
        const {data} = await axios.post(API_URL + "users/register", {name, email, password})
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        Cookies.set("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message
        })
    }
}

const logout = () => async (dispatch) => {
    try {
        Cookies.remove("userInfo")
        dispatch({
            type: USER_LOGIN_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message
        })
    }
}

export { login, register, logout }