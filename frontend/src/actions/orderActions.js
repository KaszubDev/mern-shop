import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS} from "../constants/orderConstants";
import axios from "axios"
import {API_URL} from "../constants/global";
import {CART_EMPTY} from "../constants/cartConstants";
import Cookies from "js-cookie";

const createOrder = (order) => async (dispatch, getState) => {
    console.log(order)
    dispatch({
        type: ORDER_CREATE_REQUEST,
        payload: order
    })
    try {
      const {userLogin: {userInfo}} = getState()
      const {data} = await axios.post(API_URL + "orders/", order, {
          headers: {
              Authorization: `Bearer ${userInfo.token}`
          }
      })
      dispatch({
          type: ORDER_CREATE_SUCCESS,
          payload: data.createdOrder
      })
      dispatch({
          type: CART_EMPTY
      })
      Cookies.remove("cartItems")
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export { createOrder }