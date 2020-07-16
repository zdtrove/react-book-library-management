import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as productsActions from '../../redux/products/productsActions'
import * as uiActions from '../../redux/ui/uiActions'
import ProductItem from '../../components/Products/ProductItem'
import ContentModalAddEdit from '../../components/Modal/ContentModalAddEdit'

const ProductsContainer = ({
    listProducts,
    isLoading,
    isShowModal,
    loadProducts,
    addToCart,
    filterProducts,
    hideModal,
    showModal,
    addProduct,
    changeModalContent,
    deleteProduct
}) => {
    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    const onShowModalAddBook = () => {
        showModal()
        changeModalContent(<ContentModalAddEdit changeModalContent={changeModalContent} hideModal={hideModal} addProduct={addProduct} />)
    }

    const renderProducts = () => {
        let products = null
        products = listProducts.length === 0 ? <div className="no-book">no book matched</div>
            : listProducts.map(product => {
                return <ProductItem 
                    key={product.id} 
                    product={product} 
                    addToCart={addToCart} 
                    showModal={showModal}
                    hideModal={hideModal}
                    changeModalContent={changeModalContent}
                    deleteProduct={deleteProduct}
                />
            })
        return products
    }

    return (
        <section className="products">
            <div className="section-title">
                <h2>our books</h2>
            </div>
            <div className="action-bar">
                <input className="input-text" onChange={e => filterProducts(e.target.value)} type="text" placeholder="Search..." />
                <button onClick={() => onShowModalAddBook()} className="button-products" type="button">Add book</button>
            </div>
            <div className="products-center">
                {isLoading ? <div className="wrap-loader"><span className="loader"></span></div> : renderProducts()}
            </div>
        </section>
    )
}

ProductsContainer.propTypes = {
    listProducts: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    addToCart: PropTypes.func.isRequired,
    loadProducts: PropTypes.func.isRequired,
    filterProducts: PropTypes.func.isRequired,
    isShowModal: PropTypes.bool.isRequired,
    addProduct: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    changeModalContent: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isLoading: state.ui.isLoading,
    isShowModal: state.ui.isShowModal,
    listProducts: state.products.listProducts
})

const mapDispatchToProps = dispatch => ({
    loadProducts: () => dispatch(productsActions.loadProducts()),
    filterProducts: keyword => dispatch(productsActions.filterProducts(keyword)),
    addProduct: product => dispatch(productsActions.addProduct(product)),
    addToCart: product => dispatch(productsActions.addToCart(product)),
    hideModal: () => dispatch(uiActions.hideModal()),
    showModal: () => dispatch(uiActions.showModal()),
    changeModalContent: content => dispatch(uiActions.changeModalContent(content)),
    deleteProduct: product => dispatch(productsActions.deleteProduct(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)
