import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as productActions from '../../redux/products/productsActions'
import ProductItem from '../../components/Products/ProductItem'

const ProductsContainer = ({ listProducts, isLoadingProducts, productActionsCreator }) => {
    const { loadProducts, addToCart } = productActionsCreator
    useEffect(() => {
		loadProducts()
    }, [loadProducts])
    return (
        <section className="products">
            <div className="section-title">
                <h2>our books</h2>
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
    cartActionsCreator: PropTypes.shape({
        addToCart: PropTypes.func.isRequired
    }),
    productsActionsCreator: PropTypes.shape({
        loadProducts: PropTypes.func.isRequired
    })
}

const mapStateToProps = state => ({
    isLoadingProducts: state.ui.isLoadingProducts,
    listProducts: state.products.listProducts
})

const mapDispatchToProps = dispatch => ({
    productActionsCreator: bindActionCreators(productActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)
