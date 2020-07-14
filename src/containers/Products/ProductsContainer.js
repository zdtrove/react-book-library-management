import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as productActions from '../../redux/products/productsActions'
import ProductItem from '../../components/Products/ProductItem'

const ProductsContainer = ({ listProducts, isLoadingProducts, loadProducts, addToCart }) => {
    useEffect(() => {
		loadProducts()
    }, [loadProducts])
    return (
        <section className="products">
            <div className="section-title">
                <h2>our books</h2>
            </div>
            <div className="action-bar">
                <input type="text" placeholder="Search..." />
                <button type="button">Add book</button>
            </div>
            <div className="products-center">
                {isLoadingProducts && <div className="wrap-loader"><span className="loader"></span></div>}
                {listProducts && listProducts.map(product => {
                    return <ProductItem key={product.id} product={product} addToCart={addToCart} />
                })}
            </div>
        </section>
    )
}

ProductsContainer.propTypes = {
    listProducts: PropTypes.array.isRequired,
    isLoadingProducts: PropTypes.bool.isRequired,
    addToCart: PropTypes.func.isRequired,
    loadProducts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isLoadingProducts: state.ui.isLoadingProducts,
    listProducts: state.products.listProducts
})

const mapDispatchToProps = dispatch => ({
    loadProducts: () => dispatch(productActions.loadProducts()),
    addToCart: product => dispatch(productActions.addToCart(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)
