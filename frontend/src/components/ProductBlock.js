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

const ProductCategory = styled.span`
    display: block;
`

function ProductBlock(props) {
    return (
        <Product key={props.id}>
            <Link to={`/products/${props.id}`}>
                <ProductInner>
                <ProductImage src={props.img}></ProductImage>
                <ProductTitle>{props.name}</ProductTitle>
                <ProductCategory>Category: {props.cat}</ProductCategory>
                    Price: ${props.price}
                </ProductInner>
            </Link>
        </Product>
    )
}

export default ProductBlock