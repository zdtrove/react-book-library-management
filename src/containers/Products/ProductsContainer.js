import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as productsActions from '../../redux/products/productsActions'
import ProductItem from '../../components/Products/ProductItem'

const ProductsContainer = ({ listProducts, isLoadingProducts, loadProducts, addToCart, filterProducts }) => {
    useEffect(() => {
		loadProducts()
    }, [loadProducts])

    const renderProducts = () => {
        let products = null
        products = listProducts.length === 0 ? <div className="no-book">no book matched</div>
            : listProducts.map(product => {
                return <ProductItem key={product.id} product={product} addToCart={addToCart} />
            })
        return products
    }

    return (
        <section className="products">
            <div className="section-title">
                <h2>our books</h2>
            </div>
            <div className="action-bar">
                <input onChange={e => filterProducts(e.target.value)} type="text" placeholder="Search..." />
                <button type="button">Add book</button>
            </div>
            <div className="products-center">
                {isLoadingProducts ? <div className="wrap-loader"><span className="loader"></span></div> : renderProducts()}
            </div>
        </section>
    )
}

ProductsContainer.propTypes = {
    listProducts: PropTypes.array.isRequired,
    isLoadingProducts: PropTypes.bool.isRequired,
    addToCart: PropTypes.func.isRequired,
    loadProducts: PropTypes.func.isRequired,
    filterProducts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isLoadingProducts: state.ui.isLoadingProducts,
    listProducts: state.products.listProducts
})

const mapDispatchToProps = dispatch => ({
    loadProducts: () => dispatch(productsActions.loadProducts()),
    filterProducts: keyword => dispatch(productsActions.filterProducts(keyword)),
    addToCart: product => dispatch(productsActions.addToCart(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)
