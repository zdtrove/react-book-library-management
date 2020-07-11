import React, { useEffect } from 'react';
import logo from '../../assets/images/logo.svg'
import loadingGif from '../../assets/images/loading.gif'
import store from '../../redux/store'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productsAction from '../../redux/products/productsActions'

const Home = ({ productsActionsCreator, listProducts, loadingProducts }) => {
	useEffect(() => {
		const { loadProducts } = productsActionsCreator
		loadProducts()
	}, [productsActionsCreator])
	return (
		<Provider store={store}>
			<nav className="navbar">
				<div className="navbar-center">
					<span className="nav-icon">
						<i className="fas fa-bars"></i>
					</span>
					<img src={logo} alt="store logo" />
					<div className="cart-btn">
						<span className="nav-icon">
							<i className="fa fa-cart-plus"></i>
						</span>
						<div className="cart-items">0</div>
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
					<h2>our products</h2>
				</div>
				<div className="products-center">
					{loadingProducts && <div className="loading"><img src={loadingGif} alt="loading" /></div>}
					{listProducts && listProducts.map(product => {
						return (
							<article key={product.id} className="product">
			                    <div className="img-container">
			                        <img src={product.image} alt="product" className="product-img" />
			                        <button className="bag-btn" data-id={product.id}>
			                            <i className="fas fa-shopping-cart"></i>
			                            add to cart
			                        </button>
			                    </div>
			                    <h3>{product.title}</h3>
			                    <h4>{product.price}</h4>
			                </article>
						)
					})}
				</div>
			</section>
			<div className="cart-overlay">
				<div className="cart">
					<span className="close-cart">
					<i className="fas fa-window-close"></i>
					</span>
					<h2>your cart</h2>
					<div className="cart-content"></div>
					<div className="cart-footer">
						<h3>your total : $ <span className="cart-total">0</span></h3>
						<button className="clear-cart banner-btn">clear cart</button>
					</div>
				</div>
			</div>
		</Provider>
	);
}

const mapStateToProps = state => ({
	listProducts: state.products.list,
	loadingProducts: state.ui.loadingProducts
})

const mapDispatchToProps = dispatch => {
	return {
		productsActionsCreator: bindActionCreators(productsAction, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
