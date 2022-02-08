import React, { useEffect } from 'react'
import ProductBlock from '../components/ProductBlock'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

const Products = styled.ul`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 30px;
    &:after {
        content: '';
        width: 30%;
    }
`

const CountInfo = styled.span`
    text-align: right;
    display: block;
    font-size: 15px;
    font-weight: 500;
`

function HomeScreen (props) {
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(listProducts())
      document.title = "Mern Shop - Home"
      return () => {
      };
    }, []);

    if ( !loading && products.products ) {
        return(
            <div>
             <CountInfo>Total products: {products.count}</CountInfo>
             <Products>
             {
                 products.products.map(product =>
                    <ProductBlock
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        img={product.productImage}
                        cat={product.category}
                        >
                    </ProductBlock>
                 )
             }
             </Products>
         </div>
        )
    } else if ( loading ) {
        return (
            <div>Loading...</div>
        )
    } else if ( error ) {
        return (
            <div>{`Error: ${error}`}</div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default HomeScreen;