import React from 'react'
import PropTypes from 'prop-types'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'
import { API_URL_MONGODB } from '../../constants'

function Cart({ cart, bookActionCreator }) {
    const { id, image, title, totalPrice, count } = cart
    const { increaseCart, decreaseCart, removeItem } = bookActionCreator
    return (
        <div key={id} className="cart-item">
            <img src={`${API_URL_MONGODB}/uploads/${image}`} alt="book" />
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

Cart.propTypes = {
    cart: PropTypes.object.isRequired,
    bookActionCreator: PropTypes.shape({
        increaseCart: PropTypes.func.isRequired,
        decreaseCart: PropTypes.func.isRequired,
        removeItem: PropTypes.func.isRequired
    })
}

export default Cart
