import React from 'react'
import { Link } from 'react-router-dom'

function ProductScreen (props) {
    return (
        <div>
            <h2>ProductScreen</h2>
            <Link to="/">Back to home</Link>
        </div>
    )
}

export default ProductScreen;