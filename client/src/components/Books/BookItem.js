import React from 'react'
import PropTypes from 'prop-types'
import { FaShoppingCart, FaWindowClose } from 'react-icons/fa'
import ContentModalDelete from '../Modal/ContentModalDelete'
import ContentModalEdit from '../Modal/ContentModalEdit'

function BookItem({ 
    book, 
    addToCart, 
    showModal, 
    hideModal, 
    changeModalContent, 
    deleteBook,
    editBook,
    isLoadingButton
}) {
    const { id, image, inCart, title, price } = book
    const onDeleteBook = () => {
        showModal()
        changeModalContent(<ContentModalDelete changeModalContent={changeModalContent} deleteBook={deleteBook} hideModal={hideModal} book={book} />)
    }

    const onShowModalEditBook = () => {
        showModal()
        changeModalContent(<ContentModalEdit 
            book={book}
            editBook={editBook}
            hideModal={hideModal}
            changeModalContent={changeModalContent}
            isLoadingButton={isLoadingButton}
        />)
    }
    console.log('test');

    return (
        <article key={id} className="book">
            <FaWindowClose onClick={() => onDeleteBook(book)} className="close" />
            <div className="img-container">
                <img src={image} alt="book" className="book-img" />
                <button disabled={inCart && "disabled"} onClick={() => addToCart(book)} className="bag-btn">
                    <FaShoppingCart className="fa-shopping-cart" />
                    {inCart ? <span>in cart</span> : <span>add to cart</span>}
                </button>
            </div>
            <h3>{title}</h3>
            <h4>${price}</h4>
            <button onClick={() => onShowModalEditBook()} className="btn edit" type="button">Edit</button>
        </article>
    )
}

BookItem.propTypes = {
    addToCart: PropTypes.func.isRequired,
    book: PropTypes.shape({
        inCart: PropTypes.bool.isRequired
    }),
    showModal: PropTypes.func.isRequired,
    changeModalContent: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    editBook: PropTypes.func.isRequired,
    isLoadingButton: PropTypes.bool
}

export default BookItem
