import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Product = styled.li`
    width: 30%;
    margin-bottom: 40px;
    text-align: center;
    img {
        transition: all .25s ease-in-out;
    }
    &:hover {
        img {
            opacity: 0.8;
        }
    }
`

const ProductInner = styled.div`
    padding: 30px;
    border: 1px solid #000;
`

const ProductTitle = styled.span`
    font-size: 18px;
    font-weight: 600;
    display: block;
`

const ProductImage = styled.img.attrs(props => ({
    src: props.src
}))`
    width: auto;
    height: auto;
    max-height: 200px;
    margin-bottom: 20px;
`

const ProductDetail = styled.span`
    display: block;
    margin: 10px 0;
`

const StyledLink = styled(Link)`
  display: inline-block;
  cursor: pointer;
    background-color: #000;
    border: 1px solid #000;
    padding: 10px 15px;
    margin-top: 10px;
    border-radius: 50px;
    color: #fff;
    transition: all .25s ease-in-out;
    &:hover {
        background-color: #fff;
        color: #000;
    }
`

function ProductBlock(props) {
    return (
        <Product key={props.id}>
                <ProductInner>
                    <Link to={`/products/${props.id}`}>
                        <ProductImage src={props.img}></ProductImage>
                        <ProductTitle>{props.name}</ProductTitle>
                        <ProductDetail>Category: {props.cat}</ProductDetail>
                        <ProductDetail>Producer: {props.producer}</ProductDetail>
                        <ProductDetail>Price: ${props.price}</ProductDetail>
                    </Link>
                    <StyledLink to={'/cart/'+props.id}>Add to cart</StyledLink>
                </ProductInner>
        </Product>
    )
}

export default ProductBlock