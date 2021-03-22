import React from 'react'
import PropTypes from 'prop-types'
import CartItem from './CartItem'
import { FaWindowClose } from 'react-icons/fa'

const Cart = ({ isShowCart, listCart, totalPrice, bookActionCreator, hideCart }) => {
    const { clearCart } = bookActionCreator
    const onClearCart = () => {
        clearCart()
        hideCart()
    }
    
    return (
        <div className={isShowCart ? "cart-overlay transparentBcg" : "cart-overlay"}>
            <div className={isShowCart ? "cart showCart" : "cart"}>
                <span onClick={hideCart} className="close-cart">
                    <FaWindowClose />
                </span>
                <h2>your cart</h2>
                <div className="cart-content">
                    {listCart && listCart.map((cart, index) => {
                        return <CartItem key={index} cart={cart} bookActionCreator={bookActionCreator} />
                    })}
                </div>
                <div className="cart-footer">
                    <h3>your total : $ <span className="cart-total">{totalPrice}</span></h3>
                    <button onClick={onClearCart} className="clear-cart banner-btn">clear cart</button>
                </div>
            </div>
        </div>
    )
}

Cart.propTypes = {
    hideCart: PropTypes.func.isRequired,
	cartActionsCreator: PropTypes.shape({
		addToCart: PropTypes.func.isRequired,
		removeItem: PropTypes.func.isRequired,
		increaseCart: PropTypes.func.isRequired,
		decreaseCart: PropTypes.func.isRequired,
		clearCart: PropTypes.func.isRequired
	}),
	listCart: PropTypes.array.isRequired,
    totalPrice: PropTypes.number,
    isShowCart: PropTypes.bool.isRequired
}

export default Cart