import React from 'react'
import PropTypes from 'prop-types'
import { FaShoppingCart } from 'react-icons/fa'

function ProductItem({ product, addToCart }) {
    const { id, image, inCart, title, price } = product


    return (
        <article key={id} className="product">
            <div className="img-container">
                <img src={image} alt="product" className="product-img" />
                <button disabled={inCart && "disabled"} onClick={() => addToCart(product)} className="bag-btn">
                    <FaShoppingCart className="fa-shopping-cart" />
                    {inCart ? <span>in cart</span> : <span>add to cart</span>}
                </button>
            </div>
            <h3>{title}</h3>
            <h4>{price}</h4>
        </article>
    )
}

ProductItem.propTypes = {
    addToCart: PropTypes.func.isRequired,
    product: PropTypes.shape({
        inCart: PropTypes.bool.isRequired
    })
}

export default ProductItem
