import axios from "axios"
import { API_URL } from "../constants/global"
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get(API_URL + "products/")
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message})
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})
        const {data} = await axios.get(API_URL + "products/" + productId)
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: error.message})
    }
}

export { listProducts, detailsProduct }