import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const Products = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 50px;
`

const Product = styled.li`
    background-color: green;
    padding: 30px;
`

function HomeScreen (props) {

    const [products, setProduct] = useState([])

    useEffect(() => {
      const fetchData = async () => {
          const {data} = await axios.get("/api/products")
          setProduct(data)
      }
      fetchData()
      return () => {
      };
    }, []);

    return (
        <>
            <h1>HomeScreen</h1>
            <Link to={'/products/1'}>Product name</Link>
            <Products>
            {
                products.map(product =>
                    <Product key={product.id}>
                        {product.name}
                    </Product>
                )
            }
            </Products>
        </>
    )
}

export default HomeScreen;