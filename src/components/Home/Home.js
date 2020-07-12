import React, { useEffect } from 'react';
import logo from '../../assets/images/logo.svg'
import loadingGif from '../../assets/images/loading.gif'
import store from '../../redux/store'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productsAction from '../../redux/products/productsActions'
import * as uiActions from '../../redux/ui/uiActions'
import * as cartActions from '../../redux/cart/cartActions'

const Home = ({ 
	productsActionsCreator, 
	listProducts, 
	loadingProducts, 
	uiActionsCreator, 
	showCartProp,
	listCart,
	cartActionsCreator
}) => {
	const { loadProducts, changeProducts } = productsActionsCreator
	useEffect(() => {
		loadProducts()
	}, [loadProducts])
	const { showCart, hideCart } = uiActionsCreator
	const { addToCart } = cartActionsCreator
	const addToCartClick = product => {
		addToCart(product)
		changeProducts(product.id)
	}
	return (
		<Provider store={store}>
			<nav className="navbar">
				<div className="navbar-center">
					<span className="nav-icon">
						<i className="fas fa-bars"></i>
					</span>
					<img src={logo} alt="store logo" />
					<div onClick={showCart} className="cart-btn">
						<span className="nav-icon">
							<i className="fa fa-cart-plus"></i>
						</span>
						<div className="cart-items">{listCart.length}</div>
					</div>
				</div>
			</nav>
			{/*<header className="hero">
				<div className="banner">
					<h1 className="banner-title">furniture collection</h1>
					<button className="banner-btn">shop now</button>
				</div>
			</header>*/}
			<section className="products">
				<div className="section-title">
					<h2>our books</h2>
				</div>
				<div className="products-center">
					{loadingProducts && <div className="loading"><img src={loadingGif} alt="loading" /></div>}
					{listProducts && listProducts.map(product => {
						const { id, image, title, price, inCart } = product
						return (
							<article key={id} className="product">
			                    <div className="img-container">
			                        <img src={image} alt="product" className="product-img" />
			                        <button disabled={inCart ? "disabled" : ""} onClick={() => addToCartClick(product)} className="bag-btn">
			                            <i className="fas fa-shopping-cart"></i>
			                            {inCart ? "in cart" : "add to cart"}
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
						<i className="fas fa-window-close"></i>
					</span>
					<h2>your cart</h2>
					<div className="cart-content">
						{listCart && listCart.map((item, index) => {
							return (
								<div key={index} className="cart-item">
									<img src={item.image} alt="product" />
						            <div>
						                <h4>{item.title}</h4>
						                <h5>{item.price}</h5>
						                <span className="remove-item">remove</span>
						            </div>
						            <div>
						                <i className="fas fa-chevron-up"></i>
						                <p className="item-amount">1</p>
						                <i className="fas fa-chevron-down"></i>
						            </div>
								</div>
							)})
						}
					</div>
					<div className="cart-footer">
						<h3>your total : $ <span className="cart-total">0</span></h3>
						<button onClick={hideCart} className="clear-cart banner-btn">clear cart</button>
					</div>
				</div>
			</div>
		</Provider>
	);
}

const mapStateToProps = state => ({
	listProducts: state.products.list,
	loadingProducts: state.ui.loadingProducts,
	showCartProp: state.ui.showCart,
	listCart: state.cart.listCart
})

const mapDispatchToProps = dispatch => {
	return {
		productsActionsCreator: bindActionCreators(productsAction, dispatch),
		uiActionsCreator: bindActionCreators(uiActions, dispatch),
		cartActionsCreator: bindActionCreators(cartActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
