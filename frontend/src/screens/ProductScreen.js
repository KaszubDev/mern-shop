import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { detailsProduct } from '../actions/productActions';
import { API_URL } from '../constants/global';

const GlobalWrapper = styled.div`

`

const ProductContainer = styled.div`
    display: flex;
    column-gap: 50px;
    margin-top: 40px;
`

const ProductImage = styled.img.attrs(props => ({
    src: props.src
}))`
    width: 100%;
    height: auto;
`

const ImageWrapper = styled.div`
    width: 70%;
`

const ProductDescription = styled.div`
    width: 100%;
`

const ProductFeature = styled.span`
    display: block;
    margin: 10px auto;
`

const BuyButton = styled.button.attrs(props => ({
    onClick: props.onClick
}))`
    cursor: pointer;
    background-color: #000;
    border: 1px solid #000;
    padding: 10px 15px;
    margin-top: 20px;
    border-radius: 50px;
    color: #fff;
    transition: all .25s ease-in-out;
    &:hover {
        background-color: #fff;
        color: #000;
    }
`

function ProductScreen (props) {
    const productDetails = useSelector(state => state.productDetails)
    const {product, loading, error} = productDetails
    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(detailsProduct(id, true))
        return () => {};
    }, [id]);

    const addToCart = () => {
        navigate('/cart/' + id)
    }

    return (
        <GlobalWrapper>
            <Link to="/" className='backBtn'>Back to home</Link>
            {loading ? <p>Loading...</p> :
             error ? <p>{error}</p> :
             product.product !== undefined ?
                (
                <ProductContainer>
                    <ImageWrapper>
                        <ProductImage src={API_URL + product.product.productImage}></ProductImage>
                    </ImageWrapper>
                    <ProductDescription>
                        <h1>{product.product.name}</h1>
                        <ProductFeature>Category: {product.product.category}</ProductFeature>
                        <ProductFeature>Producer: {product.product.producer}</ProductFeature>
                        <ProductFeature>Price: <strong>${product.product.price}</strong></ProductFeature>
                        <BuyButton onClick={addToCart}>Add to cart</BuyButton>
                    </ProductDescription>
                </ProductContainer>
                ) : false}
        </GlobalWrapper>
    )
}

export default ProductScreen;