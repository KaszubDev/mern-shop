import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { detailsProduct } from '../actions/productActions';

function ProductScreen (props) {

    const productDetails = useSelector(state => state.productDetails)
    const {product, loading, error} = productDetails
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(detailsProduct());
      return () => {
      };
    }, []);


    return (
        <div>
            <h2>ProductScreen</h2>
            <Link to="/">Back to home</Link>
        </div>
    )
}

export default ProductScreen;