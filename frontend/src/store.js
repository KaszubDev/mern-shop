import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import { cartReducer } from './reducers/cartReducers'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import {orderCreateReducer} from "./reducers/orderReducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const cartItems = Cookie.get('cartItems') ? JSON.parse(Cookie.get('cartItems')) : []
const userInfo = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo')) : null
const shippingData = Cookie.get('shippingData') ? JSON.parse(Cookie.get('shippingData')) : {}
const paymentMethod = Cookie.get('paymentMethod') ? JSON.parse(Cookie.get('paymentMethod')) : 'PayPal'

const initialState = {
    cart:
        { cartItems, shippingData, paymentMethod },
    userLogin:
        {userInfo}
}

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer
})

const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)))

export default store