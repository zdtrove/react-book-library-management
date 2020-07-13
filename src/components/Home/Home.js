import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import store from '../../redux/store'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productsAction from '../../redux/products/productsActions'
import * as uiActions from '../../redux/ui/uiActions'
import * as cartActions from '../../redux/cart/cartActions'
import logo from '../../assets/images/logo.svg'
import { 
	FaCartPlus, 
	FaWindowClose,
	FaChevronUp,
	FaChevronDown,
	FaBars,
	FaShoppingCart
} from 'react-icons/fa'

const Home = ({
	uiActionsCreator,
	productsActionsCreator,
	cartActionsCreator,
	listProducts,
	loadingProducts,
	showCartProp,
	listCart,
	totalPrice
}) => {
	const { loadProducts } = productsActionsCreator
	const { showCart, hideCart } = uiActionsCreator
	const { addToCart, removeItem, increaseCart, decreaseCart, clearCart } = cartActionsCreator

	useEffect(() => {
		loadProducts()
	}, [loadProducts])

	const onAddToCart = product => {
		addToCart(product)
	}

	const onRemoveCart = productId => {
		removeItem(productId)
	}

	const onClearCart = () => {
		clearCart()
		hideCart()
	}

	return (
		<Provider store={store}>
			<nav className="navbar">
				<div className="navbar-center">
					<span className="nav-icon">
						<FaBars />
					</span>
					<img src={logo} alt="store logo" />
					<div onClick={showCart} className="cart-btn">
						<span className="nav-icon">
							<FaCartPlus />
						</span>
						<div className="cart-items">{listCart.length}</div>
					</div>
				</div>
			</nav>
			<section className="products">
				<div className="section-title">
					<h2>our books</h2>
				</div>
				<div className="products-center">
					{loadingProducts && <div className="wrap-loader"><span className="loader"></span></div>}
					{listProducts && listProducts.map(product => {
						const { id, image, title, price, inCart } = product
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
					})}
				</div>
			</section>
			<div className={showCartProp ? "cart-overlay transparentBcg" : "cart-overlay"}>
				<div className={showCartProp ? "cart showCart" : "cart"}>
					<span onClick={hideCart} className="close-cart">
						<FaWindowClose />
					</span>
					<h2>your cart</h2>
					<div className="cart-content">
						{listCart && listCart.map(cart => {
							const { id, image, title, totalPrice, count } = cart
							return (
								<div key={id} className="cart-item">
									<img src={image} alt="product" />
									<div>
										<h4>{title}</h4>
										<h5>{totalPrice}</h5>
										<span onClick={() => onRemoveCart(id)} className="remove-item">remove</span>
									</div>
									<div>
										<FaChevronUp className="fa-chevron-up" onClick={() => increaseCart(id)} />
										<p className="item-amount">{count}</p>
										<FaChevronDown className="fa-chevron-down" onClick={() => decreaseCart(id)} />
									</div>
								</div>
							)
						})
						}
					</div>
					<div className="cart-footer">
						<h3>your total : $ <span className="cart-total">{totalPrice}</span></h3>
						<button onClick={onClearCart} className="clear-cart banner-btn">clear cart</button>
					</div>
				</div>
			</div>
		</Provider>
	);
}

Home.propTypes = {
	uiActionsCreator: PropTypes.shape({
		showCart: PropTypes.func.isRequired,
		hideCart: PropTypes.func.isRequired
	}),
	productsActionsCreator: PropTypes.shape({
		loadProducts: PropTypes.func.isRequired
	}),
	cartActionsCreator: PropTypes.shape({
		addToCart: PropTypes.func.isRequired,
		removeItem: PropTypes.func.isRequired,
		increaseCart: PropTypes.func.isRequired,
		decreaseCart: PropTypes.func.isRequired,
		clearCart: PropTypes.func.isRequired
	}),
	listProducts: PropTypes.array.isRequired,
	loadingProducts: PropTypes.bool.isRequired,
	showCartProp: PropTypes.bool.isRequired,
	listCart: PropTypes.array.isRequired,
	totalPrice: PropTypes.number
}

const mapStateToProps = state => ({
	listProducts: state.products.listProducts,
	loadingProducts: state.ui.loadingProducts,
	showCartProp: state.ui.showCart,
	listCart: state.cart.listCart,
	totalPrice: state.cart.totalPrice
})

const mapDispatchToProps = dispatch => {
	return {
		productsActionsCreator: bindActionCreators(productsAction, dispatch),
		uiActionsCreator: bindActionCreators(uiActions, dispatch),
		cartActionsCreator: bindActionCreators(cartActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
