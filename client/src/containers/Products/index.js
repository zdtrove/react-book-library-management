import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as productsActions from '../../redux/products/productsActions'
import * as uiActions from '../../redux/ui/uiActions'
import ProductItem from '../../components/Products/ProductItem'
import ContentModalAdd from '../../components/Modal/ContentModalAdd'
import { bindActionCreators } from 'redux'
import Pagination from 'rc-pagination';
import { PER_PAGE } from '../../constants'
import FilterProducts from '../../components/Products/FilterProducts'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ProductsContainer = ({
    uiActionCreators,
    productsActionCreators,
    listProducts,
    isLoading,
    totalProducts,
    currentPage
}) => {
    const { showModal, hideModal, changeModalContent } = uiActionCreators
    const { loadProducts, addToCart, deleteProduct, addProduct, editProduct, filterProducts } = productsActionCreators
    useEffect(() => {
        loadProducts()
    }, [loadProducts])

    const onShowModalAddBook = () => {
        showModal()
        changeModalContent(<ContentModalAdd
            changeModalContent={changeModalContent}
            hideModal={hideModal}
            addProduct={addProduct}
        />)
    }

    const [price, setPrice] = useState(100)
    const [searchParam, setSearchParam] = useState({
        title: null,
        price: null
    })

    const onFilterProduct = async e => {
        const { name, value } = e.target
        setSearchParam({
            ...searchParam,
            [name]: value
        })
        if (name === 'price') {
            setPrice(value)
        }
    }

    useEffect(() => {
        if (searchParam.title !== null || searchParam.price !== null) {
            console.log(searchParam)
            filterProducts(searchParam)
        }
    }, [filterProducts, searchParam])

    const renderProducts = () => {
        let products = null
        products = listProducts.length === 0 ? <div className="no-book">no book matched</div>
            : <TransitionGroup className="wrap-products">
                {listProducts.map(product => {
                    return <CSSTransition classNames="item" timeout={600} key={product.id}>
                        <ProductItem
                            product={product}
                            addToCart={addToCart}
                            showModal={showModal}
                            hideModal={hideModal}
                            changeModalContent={changeModalContent}
                            deleteProduct={deleteProduct}
                            editProduct={editProduct}
                        />
                    </CSSTransition>
                })}
            </TransitionGroup>
        return products
    }

    const onPaginate = page => {
        loadProducts(searchParam, page)
    }

    return (
        <section className="products">
            <div className="section-title">
                <h2>our books</h2>
            </div>
            <FilterProducts price={parseInt(price)} onFilterProduct={onFilterProduct} onShowModalAddBook={onShowModalAddBook} />
            <div className="products-center">
                {isLoading ? <div className="wrap-loader"><span className="loader"></span></div> : renderProducts()}
            </div>
            <div className="pagination">
                {listProducts.length > 0 && <Pagination
                    total={totalProducts}
                    defaultPageSize={PER_PAGE}
                    onChange={onPaginate}
                    current={currentPage}
                />}
            </div>
        </section>
    )
}

ProductsContainer.propTypes = {
    listProducts: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    uiActionCreators: PropTypes.shape({
        hideModal: PropTypes.func.isRequired,
        changeModalContent: PropTypes.func.isRequired,
    }),
    productsActionCreators: PropTypes.shape({
        addToCart: PropTypes.func.isRequired,
        loadProducts: PropTypes.func.isRequired,
        filterProducts: PropTypes.func.isRequired,
        addProduct: PropTypes.func.isRequired,
        deleteProduct: PropTypes.func.isRequired,
        editProduct: PropTypes.func.isRequired
    }),
    totalProducts: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    isLoading: state.ui.isLoading,
    listProducts: state.products.listProducts,
    totalProducts: state.products.totalProducts,
    currentPage: state.products.currentPage
})

const mapDispatchToProps = dispatch => ({
    uiActionCreators: bindActionCreators(uiActions, dispatch),
    productsActionCreators: bindActionCreators(productsActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)
