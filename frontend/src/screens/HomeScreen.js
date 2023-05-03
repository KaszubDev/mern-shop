import React, { useEffect, useState } from 'react'
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
    font-size: 15px;
    font-weight: 500;
`

const TopWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

function HomeScreen (props) {
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const dispatch = useDispatch()
    const [sortOption, setSortOption] = useState("")

    if ( !loading && products.products ) {
        products.products.sort((a, b) => {
            const [sortByField, sortOrder] = sortOption.split("-")
            const aValue = a[sortByField]
            const bValue = b[sortByField]
            if (aValue < bValue) {
                return sortOrder === "asc" ? -1 : 1
              }
              if (aValue > bValue) {
                return sortOrder === "asc" ? 1 : -1
              }
            return 0;
        })
    }

    useEffect(() => {
      dispatch(listProducts())
      document.title = "Mern Shop - Home"
    }, [dispatch]);

    if ( !loading && products.products ) {
        return(
            <div>
            <TopWrapper>
                <div>
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                        <option value="">Sort By</option>
                        <option value="category">Category</option>
                        <option value="name-asc">Name: A-Z</option>
                        <option value="name-desc">Name: Z-A</option>
                        <option value="price-asc">Price: From lowest</option>
                        <option value="price-desc">Price: From highest</option>
                    </select>
                </div>
                <CountInfo>Total products: {products.count}</CountInfo>
            </TopWrapper>
             
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