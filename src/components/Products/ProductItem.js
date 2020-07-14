import React from 'react'
import PropTypes from 'prop-types'
import { FaShoppingCart } from 'react-icons/fa'

function ProductItem({ product, addToCart }) {
    const { id, image, inCart, title, price } = product
    const onAddToCart = product => {
        addToCart(product)
    }

    return (
        <article key={id} className="product">
            <div className="img-container">
                <img src={image} alt="product" className="product-img" />
                <button disabled={inCart ? "disabled" : ""} onClick={() => onAddToCart(product)} className="bag-btn">
                    <FaShoppingCart className="fa-shopping-cart" />
                    {inCart === true ? "in cart" : "add to cart"}
                </button>
            </div>
            <h3>{title}</h3>
            <h4>{price}</h4>
        </article>
    )
}

ProductItem.propTypes = {
    product: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired
}

export default ProductItem
