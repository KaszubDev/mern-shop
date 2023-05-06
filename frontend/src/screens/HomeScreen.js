import React, { useEffect, useState } from 'react'
import ProductBlock from '../components/ProductBlock'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { ReactComponent as dropdownIcon } from '../assets/dropdown-icon.svg'

const FiltersWrapper = styled.div`
    position: absolute;
    left: 20px;
`

const FiltersTitle = styled.h3`
    margin-top: 0;
    display: inline-block;
    cursor: pointer;
    margin-bottom: 10px;
`

const FiltersSubtitle = styled.span`
    display: block;
    font-size: 16px;
    font-weight: 600;
    margin: 10px 0;
`

const FiltersLabel = styled.label`
    display: block;
    padding: 8px 0;
    cursor: pointer;
`

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

const DropdownIcon = styled(dropdownIcon)`
    width: 18px;
    height: auto;
    margin-left: 6px;
    ${props => props.opened && 'transform: rotate(180deg);'}
`

function HomeScreen (props) {
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const dispatch = useDispatch()
    const [sortOption, setSortOption] = useState("")
    const [selectedCategories, setSelectedCategories] = useState(['Laptops', 'Consoles'])
    const [selectedProducers, setSelectedProducers] = useState(['Apple', 'Acer', 'Lenovo', 'HP', 'Sony'])
    const [showFilters, setShowFilters] = useState(false)

    const sortAndFilterProducts = (products, selectedCategories, selectedProducers, sortOption) => {
        if (products) {
            // Filter the products based on the selected categories and producers
            let filteredProducts = products.filter(product => 
                (selectedCategories.includes(product.category)) &&
                (selectedProducers.includes(product.producer))
            );
        
            // Sort the filtered products based on the selected sort option
            filteredProducts.sort((a, b) => {
                const [sortByField, sortOrder] = sortOption.split("-")
                const aValue = a[sortByField]
                const bValue = b[sortByField]
                if (aValue < bValue) {
                    return sortOrder === "asc" ? -1 : 1
                }
                if (aValue > bValue) {
                    return sortOrder === "asc" ? 1 : -1
                }
                return 0
            })

            return filteredProducts
        }
    }

    const FinalProductList = sortAndFilterProducts(products?.products, selectedCategories, selectedProducers, sortOption)
    
    const handleCategoryChange = e => {
        const category = e.target.value;
        setSelectedCategories(selectedCategories => {
            if (selectedCategories.includes(category)) {
                return selectedCategories.filter(c => c !== category);
            } else {
                return [...selectedCategories, category];
            }
        })
    }

    const handleProducerChange = e => {
        const producer = e.target.value;
        setSelectedProducers(selectedProducers => {
          if (selectedProducers.includes(producer)) {
            return selectedProducers.filter(p => p !== producer);
          } else {
            return [...selectedProducers, producer];
          }
        })
      }

    useEffect(() => {
      dispatch(listProducts())
      document.title = "Mern Shop - Home"
    }, [dispatch]);

    if ( !loading && FinalProductList ) {
        return(
            <>
            <FiltersWrapper>
                <FiltersTitle onClick={() => setShowFilters(!showFilters)}>Filters</FiltersTitle>

                <DropdownIcon opened={showFilters}></DropdownIcon>

                {showFilters && 
                <>
                    <FiltersSubtitle>Category</FiltersSubtitle>
                    <FiltersLabel>
                        <input
                            type="checkbox"
                            value="Laptops"
                            checked={selectedCategories.includes('Laptops')}
                            onChange={handleCategoryChange}
                        />
                        Laptops
                    </FiltersLabel>
                    <FiltersLabel>
                        <input
                            type="checkbox"
                            value="Consoles"
                            checked={selectedCategories.includes('Consoles')}
                            onChange={handleCategoryChange}
                        />
                        Consoles
                    </FiltersLabel>
                    <FiltersSubtitle>Producer</FiltersSubtitle>
                    <FiltersLabel>
                        <input
                            type="checkbox"
                            value="Apple"
                            checked={selectedProducers.includes('Apple')}
                            onChange={handleProducerChange}
                        />
                        Apple
                    </FiltersLabel>
                    <FiltersLabel>
                        <input
                            type="checkbox"
                            value="Acer"
                            checked={selectedProducers.includes('Acer')}
                            onChange={handleProducerChange}
                        />
                        Acer
                    </FiltersLabel>
                    <FiltersLabel>
                        <input
                            type="checkbox"
                            value="Lenovo"
                            checked={selectedProducers.includes('Lenovo')}
                            onChange={handleProducerChange}
                        />
                        Lenovo
                    </FiltersLabel>
                    <FiltersLabel>
                        <input
                            type="checkbox"
                            value="HP"
                            checked={selectedProducers.includes('HP')}
                            onChange={handleProducerChange}
                        />
                        HP
                    </FiltersLabel>
                    <FiltersLabel>
                        <input
                            type="checkbox"
                            value="Sony"
                            checked={selectedProducers.includes('Sony')}
                            onChange={handleProducerChange}
                        />
                        Sony
                    </FiltersLabel>
                </>}
            </FiltersWrapper>
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
                <CountInfo>Total products: {FinalProductList.length}</CountInfo>
            </TopWrapper>
             
             <Products>
             {
                FinalProductList.length > 0 &&
                 FinalProductList.map(product =>
                    <ProductBlock
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        img={product.productImage}
                        cat={product.category}
                        producer={product.producer}
                        >
                    </ProductBlock>
                 )
             }
             {FinalProductList.length === 0 && <p>No results</p>}
             </Products>
         </>
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