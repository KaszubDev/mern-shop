import axios from "axios"
import Cookie from 'js-cookie'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"
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
        Cookie.set('cartItems', JSON.stringify(cartItems))

    } catch (error) {

    }
}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId})

    const {cart:{cartItems}} = getState()
    Cookie.set('cartItems', JSON.stringify(cartItems))
}

export { addToCart, removeFromCart }