import React from 'react'
import PropTypes from 'prop-types'
import { FaShoppingCart, FaWindowClose } from 'react-icons/fa'
import ContentModalDelete from '../../components/Modal/ContentModalDelete'

function ProductItem({ 
    product, 
    addToCart, 
    showModal, 
    hideModal, 
    changeModalContent, 
    deleteProduct
}) {
    const { id, image, inCart, title, price } = product
    const onDeleteProduct = () => {
        showModal()
        changeModalContent(<ContentModalDelete changeModalContent={changeModalContent} deleteProduct={deleteProduct} hideModal={hideModal} product={product} />)
    }

    return (
        <article key={id} className="product">
            <FaWindowClose onClick={() => onDeleteProduct(product)} className="close" />
            <div className="img-container">
                <img src={image} alt="product" className="product-img" />
                <button disabled={inCart && "disabled"} onClick={() => addToCart(product)} className="bag-btn">
                    <FaShoppingCart className="fa-shopping-cart" />
                    {inCart ? <span>in cart</span> : <span>add to cart</span>}
                </button>
            </div>
            <h3>{title}</h3>
            <h4>{price}</h4>
            <button onClick={() => showModal()} className="button-products edit" type="button">Edit</button>
        </article>
    )
}

ProductItem.propTypes = {
    addToCart: PropTypes.func.isRequired,
    product: PropTypes.shape({
        inCart: PropTypes.bool.isRequired
    }),
    showModal: PropTypes.func.isRequired,
    changeModalContent: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired
}

export default ProductItem
