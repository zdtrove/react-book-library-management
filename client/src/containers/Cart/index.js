import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiActions from '../../redux/ui/uiActions'
import * as bookActions from '../../redux/books/booksActions'
import { FaWindowClose } from 'react-icons/fa'
import CartItem from '../../components/Cart/CartItem'

const CartContainer = ({ isShowCart, listCart, totalPrice, booksActionCreator, hideCart }) => {
    const { clearCart } = booksActionCreator
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
                        return <CartItem key={index} cart={cart} booksActionCreator={booksActionCreator} />
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

CartContainer.propTypes = {
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

const mapStateToProps = state => ({
    listCart: state.books.listCart,
    totalPrice: state.books.totalPrice,
    isShowCart: state.ui.isShowCart
})

const mapDispatchToProps = dispatch => ({
    uiActionCreators: bindActionCreators(uiActions, dispatch),
    booksActionCreator: bindActionCreators(bookActions, dispatch),
    hideCart: () => dispatch(uiActions.hideCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)