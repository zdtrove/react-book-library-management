import React from 'react'
import PropTypes from 'prop-types'

function ContentModalDelete({ hideModal, deleteBook, book, changeModalContent, isLoadingButton }) {
    const onHideModal = () => {
        hideModal()
        changeModalContent()
    }

    return (
        <div className="popup-delete">
            <p>Are you sure to delete this book?</p>
            <div className="wrap-button">
                <button onClick={onHideModal} className="btn cancel" type="button">cancel</button>
                <button onClick={() => deleteBook(book)} className="btn" type="button">delete {isLoadingButton && <span className="loader"></span>}</button>
            </div>
        </div>
    )
}

ContentModalDelete.propTypes = {
    hideModal: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    changeModalContent: PropTypes.func.isRequired,
    isLoadingButton: PropTypes.bool
}

export default ContentModalDelete
