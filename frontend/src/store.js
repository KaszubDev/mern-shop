import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import { cartReducer } from './reducers/cartReducers'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'

const cartItems = JSON.parse(Cookie.get('cartItems')) || []

const initialState = {cart: {cartItems}}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
})

const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)))

export default store