import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import { cartReducer } from './reducers/cartReducers'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'

const cartItems = Cookie.get('cartItems') ? JSON.parse(Cookie.get('cartItems')) : []
const userInfo = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo')) : null

const initialState = { cart: {cartItems, shipping: {}, payment: {} }, userLogin: {userInfo}}

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)))

export default store