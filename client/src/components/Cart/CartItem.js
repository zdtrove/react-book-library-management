import React from 'react'
import PropTypes from 'prop-types'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

function CartItem({ cart, productsActionCreator }) {
    const { id, image, title, totalPrice, count } = cart
    const { increaseCart, decreaseCart, removeItem } = productsActionCreator
    return (
        <div key={id} className="cart-item">
            <img src={image} alt="product" />
            <div>
                <h4>{title}</h4>
                <h5>{totalPrice}</h5>
                <span onClick={() => removeItem(id)} className="remove-item">remove</span>
            </div>
            <div>
                <FaChevronUp className="fa-chevron-up" onClick={() => increaseCart(cart)} />
                <p className="item-amount">{count}</p>
                <FaChevronDown className="fa-chevron-down" onClick={() => decreaseCart(cart)} />
            </div>
        </div>
    )
}

CartItem.propTypes = {
    cart: PropTypes.object.isRequired,
    productsActionCreator: PropTypes.shape({
        increaseCart: PropTypes.func.isRequired,
        decreaseCart: PropTypes.func.isRequired,
        removeItem: PropTypes.func.isRequired
    })
}

export default CartItem
