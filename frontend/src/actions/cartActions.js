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
        let cartItems = getState().cart.cartItems
        let quantity = 1
        // check if product already in the cart
        if ( cartItems.filter(x => x.product === productId).length ) {
            quantity = cartItems.filter(x => x.product === productId)[0].quantity + quantity
        }

        dispatch({type: CART_ADD_ITEM, payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            quantity: quantity,
            image: data.product.productImage,
            category: data.product.category,
            producer: data.product.producer
        }})
        cartItems = getState().cart.cartItems
        Cookies.set('cartItems', JSON.stringify(cartItems))

    } catch (error) {
        console.log(error)
    }
}

const removeFromCart = (productId, isDeleteAll) => (dispatch, getState) => {
    let cartItems = getState().cart.cartItems
    const item = cartItems.filter(x => x.product === productId)[0]
    
    if ( !isDeleteAll && item.quantity > 1 ) {
        dispatch({type: CART_ADD_ITEM, payload: {
            product: item.product,
            name: item.name,
            price: item.price,
            quantity: item.quantity - 1,
            image: item.productImage,
            category: item.category,
            producer: item.producer
        }})
    } else {
        dispatch({type: CART_REMOVE_ITEM, payload: productId})
    }
    cartItems = getState().cart.cartItems
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