import axios from "axios"
import Cookies from 'js-cookie'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants"
import { API_URL } from "../constants/global"

const addToCart = (productId) => async (dispatch, getState) => {
    try {
        const {data} = await axios.get(API_URL + 'products/' + productId)
        dispatch({type: CART_ADD_ITEM, payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.productImage,
            category: data.product.category,
            producer: data.product.producer
        }})
        const {cart:{cartItems}} = getState()
        Cookies.set('cartItems', JSON.stringify(cartItems))

    } catch (error) {

    }
}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId})

    const {cart:{cartItems}} = getState()
    Cookies.set('cartItems', JSON.stringify(cartItems))
}

const saveShippingAddress = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data})
    Cookies.set('shippingData', JSON.stringify(data))
}

const savePaymentMethod = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data})
}

export { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod }