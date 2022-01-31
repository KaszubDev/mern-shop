import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const API_URL='http://localhost:5000/'

const Products = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 30px;
`

const Product = styled.li`
    width: 30%;
    margin-bottom: 40px;
    text-align: center;
`

const CountInfo = styled.span`
    text-align: right;
    display: block;
    font-size: 15px;
    font-weight: 500;
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

function HomeScreen (props) {

    const [products, setProduct] = useState([])
    const [productsCount, setCount] = useState()

    useEffect(() => {
      const fetchData = async () => {
          const {data} = await axios.get(API_URL + "products/")
          setProduct(data.products)
          setCount(data.count)
      }
      fetchData()
      return () => {
      };
    }, []);

    return (
        <>
            <CountInfo>Total products: {productsCount}</CountInfo>
            <Products>
            {
                products.map(product =>
                    <Product key={product._id}>
                        <Link to={`/products/${product._id}`}>
                            <ProductInner>
                                <ProductTitle>{product.name}</ProductTitle>
                                Price: ${product.price}
                            </ProductInner>
                        </Link>
                    </Product>
                )
            }
            </Products>
        </>
    )
}

export default HomeScreen;